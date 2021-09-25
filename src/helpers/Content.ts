import Service from '~/types/Service';
import Item from '~/types/Item';

export const Content = {
	validateDecorator(errors: { name: { active: boolean; message: string } }) {
		return function validate(value: string): boolean {
			errors.name.active = false;
			if (value === '') {
				errors.name.message = 'Заполните поле';
				errors.name.active = true;
			}
			return errors.name.active;
		};
	},

	addItemDecorator(
		service: Service,
		data: { list: Item[] },
		validate: (name: string) => boolean,
		errors: { name: { active: boolean; message: string } },
	) {
		return async function addItem(name: string): Promise<void> {
			if (validate(name)) {
				return;
			}
			try {
				const response = await service.addItem({ name });
				data.list.unshift(response.data.data);
			} catch (error: any) {
				errors.name.message = error?.response?.data?.errors.name[0];
				errors.name.active = true;
			}
		};
	},

	getDataDecorator(service: Service, data: { list: Item[] }, lastPage: { value: number }) {
		return async function getData(page = 1, search = ''): Promise<void> {
			const response = await service.getPagen(page, search);
			data.list = response.data.data;
			lastPage.value = response.data.meta.last_page;
		};
	},

	updateItemDecorator(service: Service, data: { list: Item[] }, minId: number) {
		return async function updateItem(id: number, name: string): Promise<void> {
			if (id > minId) {
				data.list = data.list.map((item) => ({
					id: item.id,
					name: item.id === id ? name : item.name,
				}));
				await service.updateItem(id, { name: name.trim() });
			}
		};
	},

	deleteItemDecorator(service: Service) {
		return async function deleteItem(id: number): Promise<void> {
			await service.deleteItem(id);
		};
	},
};
