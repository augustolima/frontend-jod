const reorderRows = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reorderColumns = (columns, source, destination) => {
  const sourceColumn = columns.find((item) => item.id === Number(source.droppableId));
  const destinationColumn = columns.find((item) => item.id === Number(destination.droppableId));
  const sourceData = [...sourceColumn.data];
  const destinationData = [...destinationColumn.data];

  // remove from original
  const [removed] = sourceData.splice(source.index, 1);
  // insert into next
  destinationData.splice(destination.index, 0, removed);

  return {
    sourceData,
    destinationData,
  };
};

export { reorderRows, reorderColumns };
