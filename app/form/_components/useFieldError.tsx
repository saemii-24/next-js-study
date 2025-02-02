import {useActionState} from 'react';

type FormState<T> = {
	success: boolean;
	values: T;
	errors?: Partial<Record<keyof T, string>>;
	allError?: string;
};

type ValidationFn<T> = (values: T) => Partial<Record<keyof T, string>>;

async function formSubmit<T>(
	previousState: FormState<T>,
	formData: FormData,
	validate: ValidationFn<T>,
	errorOption: 'each' | 'all',
	message: string | Record<keyof T, string>,
): Promise<FormState<T>> {
	const values = Object.fromEntries(formData.entries()) as T;
	const errors = validate(values);

	const hasErrors = Object.keys(errors).length > 0;

	if (errorOption === 'each') {
		// 개별 오류 메시지 처리
		const errorMessages = Object.fromEntries(
			Object.entries(errors).map(([key, errorMessage]) => {
				const messageForKey =
					typeof message === 'string'
						? message
						: (message as Record<keyof T, string>)[key as keyof T];
				return [key, messageForKey ?? errorMessage];
			}),
		);

		return {
			success: !hasErrors,
			values,
			errors: errorMessages as Partial<Record<keyof T, string>>,
		};
	} else if (errorOption === 'all') {
		// 전체 오류 메시지 처리
		const allErrorMessage =
			typeof message === 'string' ? message : '기본 오류 메시지';
		return {
			success: !hasErrors,
			values,
			allError: allErrorMessage,
		};
	}

	return {success: !hasErrors, values, errors};
}

export function useForm<T>({
	initialValues,
	validate,
	errorOption = 'each',
	message,
}: {
	initialValues: T;
	validate: ValidationFn<T>;
	errorOption?: 'each' | 'all';
	message: string | Record<keyof T, string>;
}) {
	const [formState, formAction, isPending] = useActionState<
		FormState<T>,
		FormData
	>(
		(prev, formData) =>
			formSubmit(prev, formData, validate, errorOption, message),
		{
			success: false,
			values: initialValues,
		},
	);

	return {formState, formAction, isPending};
}
