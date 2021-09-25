import Time from '~/types/Time';

type TimeResponse = { data: { data: Time } };

export default interface Service {
	getItem(): TimeResponse;
	updateItem(payload: Time): void;
}
