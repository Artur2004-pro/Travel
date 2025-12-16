function hybridCascadeDelete({ onQuery, onDocument }) {
  return function (schema) {
    schema.post(
      ["deleteOne", "deleteMany", "findOneAndDelete", "findByIdAndDelete"],
      { query: true, document: false },
      async function () {
        await onQuery(this);
      }
    );

    schema.post(
      ["deleteOne", "remove"],
      { query: false, document: true },
      async function () {
        await onDocument(this);
      }
    );
  };
}

module.exports = hybridCascadeDelete;
