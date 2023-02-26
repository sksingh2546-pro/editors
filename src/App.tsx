import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Title from './components/layout/Title';
import FlowContainer from './containers/FlowContainer';
import { FiberEditor, FlowEditor, HexGridEditor, ImageMapEditor, WorkflowEditor } from './editors';

type EditorType = 'imagemap' | 'workflow' | 'flow' | 'hexgrid' | 'fiber';

interface IState {
	activeEditor?: EditorType;
}

class App extends Component<any, IState> {
	state: IState = {
		activeEditor: 'imagemap',
	};

	handleChangeEditor = ({ key }) => {
		this.setState({
			activeEditor: key,
		});
	};

	renderEditor = () => {
		
				return <ImageMapEditor />;
	};

	render() {
		const { activeEditor } = this.state;
		return (
			<div className="rde-main">
				<FlowContainer>
					<div >{this.renderEditor()}</div>
				</FlowContainer>
			</div>
		);
	}
}

export default App;
