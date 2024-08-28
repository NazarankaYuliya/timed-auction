export function transformItem(item: any) {
  return {
    _id: item._id.toString(),
    catalogNumber: item.catalogNumber,
    title: item.title,
    description: item.description,
    price: item.price,
  };
}
