'use client';

import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

type Song = {
	id: number;
	title: string;
	artist?: string;
	lyrics?: string;
};

export default function SongPage() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const {register, handleSubmit, reset} = useForm<{
		title: string;
		artist: string;
		lyrics: string;
	}>({
		defaultValues: {title: '', artist: '', lyrics: ''},
	});

	const addSong = (data: {title: string; artist: string; lyrics: string}) => {
		//TODO: implement addSong
	};

	const removeSong = (id: number) => {
		//TODO: implement removeSong
	};

	const selected = songs.find((s) => s.id === selectedId) ?? null;

	return (
		<main className='min-h-screen bg-yellow-50 flex items-center justify-center p-6'>
			<div className='w-full max-w-4xl rounded-2xl border border-yellow-200 bg-white shadow-md overflow-hidden'>
				<header className='bg-yellow-200 px-6 py-6'>
					<h1 className='text-3xl font-semibold text-yellow-900'>
						나의 음악 노트
					</h1>
					<p className='text-sm text-yellow-800/80 mt-1'>
						좋아하는 노래와 가사를 등록해보세요.
					</p>
				</header>

				<section className='flex flex-col md:flex-row gap-4 p-6'>
					<div className='md:w-1/2'>
						<form
							onSubmit={handleSubmit(addSong)}
							className='flex flex-col gap-3'>
							<input
								aria-label='song title'
								{...register('title')}
								placeholder='제목'
								className='w-full rounded-md border border-yellow-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300'
							/>
							<input
								aria-label='artist'
								{...register('artist')}
								placeholder='가수'
								className='w-full rounded-md border border-yellow-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300'
							/>
							<textarea
								aria-label='lyrics'
								{...register('lyrics')}
								placeholder='가사'
								rows={4}
								className='w-full rounded-md border border-yellow-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none'
							/>
							<div className='flex gap-2'>
								<button
									type='submit'
									className='inline-flex items-center gap-2 rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600'>
									음악 추가
								</button>
								<button
									type='button'
									onClick={() => {
										reset({title: '', artist: '', lyrics: ''});
									}}
									className='inline-flex items-center gap-2 rounded-md border border-yellow-200 px-4 py-2 text-sm text-yellow-800'>
									초기화
								</button>
							</div>
						</form>

						<div className='mt-6'>
							<h2 className='text-sm font-semibold text-yellow-900'>
								추가된 음악
							</h2>
							<ul className='mt-3 max-h-[48vh] overflow-auto divide-y divide-yellow-100'>
								{songs.length === 0 && (
									<li className='py-4 text-sm text-yellow-700/80'>
										등록된 음악이 없습니다.
									</li>
								)}
								{songs.map((s) => (
									<li
										key={s.id}
										className={`flex items-center justify-between gap-3 px-2 py-3 cursor-pointer ${
											selectedId === s.id ? 'bg-yellow-50 rounded-md' : ''
										}`}
										onClick={() => setSelectedId(s.id)}>
										<div>
											<div className='text-sm font-medium text-yellow-900 capitalize'>
												{s.title}
											</div>
											{s.artist && (
												<div className='text-xs text-yellow-800/70'>
													{s.artist}
												</div>
											)}
										</div>
										<div className='flex items-center gap-2'>
											<button
												onClick={(e) => {
													e.stopPropagation();
													removeSong(s.id);
												}}
												className='text-xs text-red-500 hover:underline'>
												삭제
											</button>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='md:w-1/2'>
						<div className='h-full rounded-md border border-yellow-100 bg-yellow-50 p-4'>
							{!selected && (
								<div className='flex h-full flex-col items-center justify-center text-center text-yellow-900/80'>
									<div className='text-lg font-semibold'>
										음악을 선택해주세요
									</div>
									<div className='mt-2 text-sm'>
										등록한 음악을 선택하면 가사를 볼 수 있습니다.
									</div>
								</div>
							)}

							{selected && (
								<div className='flex h-full flex-col gap-4'>
									<div className='flex items-start justify-between'>
										<div>
											<h3 className='text-2xl font-bold text-yellow-900 capitalize'>
												{selected.title}
											</h3>
											{selected.artist && (
												<div className='text-sm text-yellow-800/80'>
													{selected.artist}
												</div>
											)}
										</div>
										<div>
											<button
												onClick={() => {
													reset({
														title: selected.title,
														artist: selected.artist ?? '',
														lyrics: selected.lyrics ?? '',
													});
												}}
												className='text-sm rounded-md border border-yellow-200 px-3 py-1 text-yellow-900'>
												수정
											</button>
										</div>
									</div>

									<div className='flex-1 overflow-auto whitespace-pre-wrap text-sm text-yellow-900/90'>
										{selected.lyrics ? (
											selected.lyrics
										) : (
											<em className='text-yellow-800/70'>
												등록된 가사가 없습니다.
											</em>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
