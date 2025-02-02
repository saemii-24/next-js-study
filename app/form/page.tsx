'use client';

import Container from '@/components/Container';
import {useActionState, useState, startTransition} from 'react';
export default function Form() {
	return (
		<Container>
			<Container.Title>Form</Container.Title>
			<Container.SubTitle>form 예제1</Container.SubTitle>
			<NumberForm />
			<Container.SubTitle>form 예제2</Container.SubTitle>
			<LoginForm />
		</Container>
	);
}

async function addNumber(
	previousState: number,
	formData: FormData,
): Promise<number> {
	const newValue = Number(formData.get('number'));
	return previousState + newValue;
}

function NumberForm() {
	const [state, formAction, isPending] = useActionState<number, FormData>(
		addNumber,
		0,
	);

	return (
		<div>
			<h2 className='text-xl mb-2'>현재 값: {state}</h2>
			<form action={formAction} className='mt-3'>
				<input
					type='number'
					name='number'
					required
					placeholder='숫자를 입력하세요'
					className='bg-gray-100 h-12 rounded-lg px-2 ring'
				/>
				<button
					type='submit'
					disabled={isPending}
					className='h-12 px-3 bg-blue-500 rounded-lg text-white'>
					{isPending ? '계산 중...' : '더하기'}
				</button>
			</form>
		</div>
	);
}
type FormState = {
	success: boolean;
	id: string;
	password: string;
	idError?: string;
	passwordError?: string;
	allError?: string;
	errorOption: 'each' | 'all';
};

async function loginSubmit(
	previousState: FormState,
	formData: FormData,
): Promise<FormState> {
	console.log(previousState);
	function formDataToFormState(formData: FormData): FormState {
		const validKeys: (keyof FormState)[] = ['id', 'password', 'errorOption'];
		const formObject = Object.fromEntries(
			Array.from(formData.entries()).filter(([key]) =>
				validKeys.includes(key as keyof FormState),
			),
		) as Partial<FormState>;

		return {
			id: formObject.id ?? '',
			password: formObject.password ?? '',
			errorOption:
				previousState.errorOption === 'each' ||
				previousState.errorOption === 'all'
					? previousState.errorOption
					: 'all', // 기본값 설정
			success: false,
		};
	}
	const {id, password, errorOption} = formDataToFormState(formData);

	// 기본 FormState 객체
	const result: FormState = {
		id,
		password,
		errorOption,
		success: true,
	};

	// 유효성 검사 수행
	if (errorOption === 'each') {
		let idError: string | undefined;
		let passwordError: string | undefined;

		if (id.length < 4) {
			idError = '아이디는 4글자 이상이어야 합니다.';
		}
		if (password.length < 6) {
			passwordError = '비밀번호는 6글자 이상이어야 합니다.';
		}

		// 오류가 있으면 실패 상태 반환
		if (idError || passwordError) {
			return {...result, success: false, idError, passwordError};
		}
	} else {
		if (id.length < 4 || password.length < 6) {
			if (id.length < 4 || password.length < 6) {
				return {
					...result,
					success: false,
					idError: undefined,
					passwordError: undefined,
					allError: '아이디는 4글자, 비밀번호는 6글자 이상이어야 합니다.',
				};
			}
		}
	}

	return result;
}

function LoginForm() {
	const [loginState, loginFormAction, loginIsPending] = useActionState<
		FormState,
		FormData
	>(loginSubmit, {
		success: false,
		id: '',
		password: '',
		errorOption: 'all',
	});

	return (
		<div>
			<form action={loginFormAction}>
				<div>
					<label>아이디</label>
					<input
						type='text'
						name='id'
						className='bg-gray-100 h-12 rounded-lg px-2 ring'
					/>
					{loginState.errorOption === 'each' && loginState.idError && (
						<p className='text-red-500 text-xs'>{loginState.idError}</p>
					)}
				</div>
				<div>
					<label>비밀번호</label>
					<input
						type='password'
						name='password'
						className='bg-gray-100 h-12 rounded-lg px-2 ring'
					/>
					{loginState.errorOption === 'each' && loginState.passwordError && (
						<p className='text-red-500 text-xs'>{loginState.passwordError}</p>
					)}
				</div>
				<button
					type='submit'
					disabled={loginIsPending}
					className='py-1 px-2 bg-blue-500 text-white rounded-lg cursor-pointer'>
					{loginIsPending ? '로그인 중...' : '로그인'}
				</button>
			</form>
			{loginState.errorOption === 'all' && loginState.allError && (
				<p className='text-red-500 text-xs'>{loginState.allError}</p>
			)}
		</div>
	);
}
