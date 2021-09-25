type ListResponse = { data: { data: { id: number; name: string }[]; meta: { last_page: number } } };
type ItemResponse = { data: { data: { id: number; name: string } } };

export default interface Service {
	getItems(search?: string | null): ListResponse;
	getPagen(page?: number | null, search?: string | null): ListResponse;
	addItem(payload: { name: string }): ItemResponse;
	updateItem(id: number, payload: { name: string }): void;
	deleteItem(id: number): void;
}
