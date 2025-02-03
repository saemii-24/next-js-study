import Child from './_components/Child';
import Child2 from './_components/Child2';
import Parent from './_components/Parent';

const App = () => {
	return (
		<Parent>
			<Child />
			<Child2 num={3} />
		</Parent>
	);
};

export default App;
