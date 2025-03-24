import Container from '@/components/Container';

export default function Search() {
	return (
		<Container>
			<Container.Title className=''>HTML Semantic Tags</Container.Title>
			<header>
				<h1>Movie website</h1>
				<search>
					<form action='./search/'>
						<label htmlFor='movie'>Find a Movie</label>
						<input type='search' id='movie' name='q' />
						<button type='submit'>Search</button>
					</form>
				</search>
			</header>
		</Container>
	);
}
