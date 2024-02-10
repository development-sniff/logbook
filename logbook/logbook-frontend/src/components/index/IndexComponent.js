import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import {Link} from 'react-router-dom';

const IndexComponentBlock = styled(Responsive)`
	margin-top: 2.5rem;
	min-height: calc(100vh - 200px - 3rem);

*{
display:flex;
}
`;


const IndexComponent = () => {
	return(
	<IndexComponentBlock>
		<div>{/*세로*/}
			<div>{/*가로*/}
				<div>{/*세로*/}
				</div>
				<div>{/*3.js*/}
				</div>
				
			</div>
			<div>
			</div>
		</div>
	</IndexComponentBlock>
	)
}

export default IndexComponent;