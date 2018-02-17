console.log("React is on!");

class Game extends React.Component{
	constructor(props){
		super(props);
		this.handleAddQuest = this.handleAddQuest.bind(this);
		this.state = {
			level: 0,
			quests: ["Quest one", "Quest two", "Quest three"],
			visibility: false
		};
	}
	handleAddQuest(e){

		e.preventDefault();

		const quest = e.target.element.quest.value.trim();

		if(quest){
			this.state.quests.push(quest);
			this.setState({
				quests: this.state.quests
			});
			
		}
	}

	render(){
		return(
		<div>
			<Header level = {this.state.level}/>
			<QuestLog quests={this.state.quests}/>
			<AddQuest quests={this.state.quests} addQuest={this.handleAddQuest} 
			visibility={this.state.visibility}
			/>
		</div>
		);
	}
};

class Header extends React.Component {
	render(){
		return(
			<div>
				<h1>{this.props.level}</h1>
			</div>
		);
	}
};


class QuestLog extends React.Component{
	render(){
		return(
			<div>
				<ul>
					{
						this.props.quests.map((quest) => 
						<Quest key= {quest} questText = {quest}/>)
					}
				</ul>
			</div>	
		);
	}
}

class Quest extends React.Component{
	render(){
		return(
			<div>
				{this.props.questText}
			</div>
		);
	};
}

class AddQuest extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			visibility: this.props.visibility
		}
		this.toggleVisibility = this.toggleVisibility.bind(this);
	}

	toggleVisibility(){
		this.setState(function(prevState){
			return{
				visibility: !prevState.visibility
			}
		});
	}

	render(){
		return(
			<div>
			<button onClick={this.toggleVisibility}>
				Add Quest
			</button>
			{this.state.visibility && (
				<form onSubmit ={this.props.addQuest}>
					<input type="text"  name= "quest"/>
					<button onClick={this.toggleVisibility} type="button" name= "Submit!"/>
				</form>
			)}
			</div>
		);
	}
}



ReactDOM.render(<Game/>, document.getElementById("gameconsole"));