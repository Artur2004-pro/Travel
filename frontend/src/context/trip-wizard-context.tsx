import React, { createContext, useCallback, useContext, useReducer, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type TripData = Record<string, any>;

type State = {
  tripData: TripData;
  completed: Record<string, boolean>;
  loading: boolean;
};

type Validator = () => Promise<boolean> | boolean;

type Action =
  | { type: 'setData'; patch: Partial<TripData> }
  | { type: 'setCompleted'; key: string; value: boolean }
  | { type: 'setLoading'; value: boolean };

const initialState: State = {
  tripData: {},
  completed: {},
  loading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setData':
      return { ...state, tripData: { ...state.tripData, ...action.patch } };
    case 'setCompleted':
      return { ...state, completed: { ...state.completed, [action.key]: action.value } };
    case 'setLoading':
      return { ...state, loading: action.value };
    default:
      return state;
  }
}

type ContextValue = {
  tripData: TripData;
  setTripData: (patch: Partial<TripData>) => void;
  completed: Record<string, boolean>;
  setCompleted: (key: string, value: boolean) => void;
  next: () => Promise<boolean>;
  back: () => void;
  goToStep: (key: string) => Promise<boolean>;
  registerValidator: (stepKey: string, fn: Validator) => void;
  unregisterValidator: (stepKey: string) => void;
  loading: boolean;
};

const WizardContext = createContext<ContextValue | null>(null);

export const TripWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const validators = useRef<Record<string, Validator>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const setTripData = useCallback((patch: Partial<TripData>) => {
    dispatch({ type: 'setData', patch });
  }, []);

  const setCompleted = useCallback((key: string, value: boolean) => {
    dispatch({ type: 'setCompleted', key, value });
  }, []);

  const setLoading = useCallback((v: boolean) => dispatch({ type: 'setLoading', value: v }), []);

  const runValidation = useCallback(async (stepKey: string) => {
    const fn = validators.current[stepKey];
    if (fn) {
      try {
        const r = await Promise.resolve(fn());
        return Boolean(r);
      } catch (e) {
        return false;
      }
    }

    // Basic built-in validations to prevent obvious progress without required data
    if (stepKey === 'country') return Boolean(state.tripData.countryId);
    if (stepKey === 'planning') return Boolean(state.tripData.startDate && state.tripData.endDate);
    // other steps: default allow
    return true;
  }, [state.tripData]);

  const next = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    try {
      const parts = location.pathname.split('/');
      const current = parts.pop() || 'country';
      const steps = ['country', 'planning', 'city', 'hotel', 'day-planning', 'finish'];
      const idx = steps.indexOf(current);
      if (idx === -1) return false;
      const ok = await runValidation(current);
      if (!ok) return false;
      const nextStep = steps[idx + 1];
      if (nextStep) {
        navigate(`/trips/new/${nextStep}`);
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, [location.pathname, navigate, runValidation, setLoading]);

  const back = useCallback(() => {
    const parts = location.pathname.split('/');
    const current = parts.pop() || 'country';
    const steps = ['country', 'planning', 'city', 'hotel', 'day-planning', 'finish'];
    const idx = steps.indexOf(current);
    const prev = steps[idx - 1];
    if (prev) navigate(`/trips/new/${prev}`);
    else navigate('/trips');
  }, [location.pathname, navigate]);

  const goToStep = useCallback(async (key: string) => {
    const steps = ['country', 'planning', 'city', 'hotel', 'day-planning', 'finish'];
    const targetIdx = steps.indexOf(key);
    const parts = location.pathname.split('/');
    const current = parts.pop() || 'country';
    const currentIdx = steps.indexOf(current);
    // if navigating forward, validate current
    if (targetIdx > currentIdx) {
      const ok = await runValidation(current);
      if (!ok) return false;
    }
    navigate(`/trips/new/${key}`);
    return true;
  }, [location.pathname, navigate, runValidation]);

  const registerValidator = useCallback((stepKey: string, fn: Validator) => {
    validators.current[stepKey] = fn;
  }, []);

  const unregisterValidator = useCallback((stepKey: string) => {
    delete validators.current[stepKey];
  }, []);

  const value: ContextValue = {
    tripData: state.tripData,
    setTripData,
    completed: state.completed,
    setCompleted,
    next,
    back,
    goToStep,
    registerValidator,
    unregisterValidator,
    loading: state.loading,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};

export const useTripWizard = () => {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useTripWizard must be used within TripWizardProvider');
  return ctx;
};

export default TripWizardProvider;
