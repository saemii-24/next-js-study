'use client';

import {useState} from 'react';
import {getUploadUrl, uploadFileApi, notifyApi} from './_query/callApi';

type StepStatus = 'idle' | 'loading' | 'success' | 'error';

interface UploadStatus {
	step1: StepStatus;
	step2: StepStatus;
	step3: StepStatus;
	error?: string;
}

// 재시도
async function retry<T>(
	fn: () => Promise<T>,
	retries = 3,
	delay = 800,
): Promise<T> {
	try {
		return await fn();
	} catch (err) {
		if (retries === 0) throw err;
		await new Promise((res) => setTimeout(res, delay));
		return retry(fn, retries - 1, delay);
	}
}

export default function PromisePage() {
	//현재 상태
	const [status, setStatus] = useState<UploadStatus>({
		step1: 'idle',
		step2: 'idle',
		step3: 'idle',
	});

	// 결과 캐싱 (재시도 버튼)
	const [uploadUrl, setUploadUrl] = useState<string | null>(null);
	const [fileUrl, setFileUrl] = useState<string | null>(null);

	// STEP 1
	const runStep1 = async () => {
		setStatus((s) => ({...s, step1: 'loading'}));
		const {uploadUrl} = await retry(getUploadUrl);
		setUploadUrl(uploadUrl);
		setStatus((s) => ({...s, step1: 'success', step2: 'loading'}));
		return uploadUrl;
	};

	// STEP 2
	const runStep2 = async (url: string) => {
		setStatus((s) => ({...s, step2: 'loading'}));
		const {fileUrl} = await retry(() => uploadFileApi(url, 'test.txt'));
		setFileUrl(fileUrl);
		setStatus((s) => ({...s, step2: 'success', step3: 'loading'}));
		return fileUrl;
	};

	// STEP 3
	const runStep3 = async (fileUrl: string) => {
		setStatus((s) => ({...s, step3: 'loading'}));
		await retry(() => notifyApi(fileUrl));
		setStatus((s) => ({...s, step3: 'success'}));
	};

	// 전체 실행
	const startProcess = async () => {
		setStatus({step1: 'idle', step2: 'idle', step3: 'idle'});
		setUploadUrl(null);
		setFileUrl(null);

		try {
			const url = await runStep1();
			const file = await runStep2(url);
			await runStep3(file);
		} catch (err: any) {
			setStatus((s) => ({
				...s,
				error: err.message,
				step1: s.step1 === 'loading' ? 'error' : s.step1,
				step2: s.step2 === 'loading' ? 'error' : s.step2,
				step3: s.step3 === 'loading' ? 'error' : s.step3,
			}));
		}
	};

	// 실패 step 판별
	const failedStep =
		status.step1 === 'error'
			? 1
			: status.step2 === 'error'
				? 2
				: status.step3 === 'error'
					? 3
					: null;

	// 실패한 step부터 retry
	const retryFailedStep = async () => {
		setStatus((s) => ({...s, error: undefined}));

		try {
			if (failedStep === 1) {
				const url = await runStep1();
				const file = await runStep2(url);
				await runStep3(file);
			}

			if (failedStep === 2 && uploadUrl) {
				const file = await runStep2(uploadUrl);
				await runStep3(file);
			}

			if (failedStep === 3 && fileUrl) {
				await runStep3(fileUrl);
			}
		} catch (err: any) {
			setStatus((s) => ({...s, error: err.message}));
		}
	};

	return (
		<div className='p-10 space-y-4'>
			<h1 className='text-xl font-bold'>Promise Page</h1>

			<button
				onClick={startProcess}
				className='bg-blue-100 text-blue-600 px-4 py-2 rounded-xl cursor-pointer font-semibold'>
				Start Promise Flow
			</button>

			<ul className='space-y-1'>
				<li>STEP 1 (URL 요청): {status.step1}</li>
				<li>STEP 2 (파일 업로드): {status.step2}</li>
				<li>STEP 3 (결과 전송): {status.step3}</li>
			</ul>

			{status.error && <p className='text-red-500'>Error: {status.error}</p>}

			{failedStep && (
				<button
					onClick={retryFailedStep}
					className='bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-semibold'>
					Retry Failed Step
				</button>
			)}
		</div>
	);
}
