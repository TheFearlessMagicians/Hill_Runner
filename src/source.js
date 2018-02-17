console.log("React is on!");

class Game extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			level: 0,
			quests: ["Quest one", "Quest two", "Quest three"],
			visibility: false
		};
	}

	render(){
		return(
		<div>
			<Header level = {this.state.level}/>
			<QuestLog quests={this.state.quests}/>
			<AddQuest quests={this.state.quests} 
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
		this.handleAddQuest = this.handleAddQuest.bind(this);
	}

	handleAddQuest(e){
		e.preventDefault(); //No refresh

		const quest = e.target.element.quest.value.trim();

		if(quest){
			this.props.quests.push(quest);
		}
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
				<form onSubmit = {this.handleAddQuest}>
					<input type="text"  name= "quest"/>
					<button onClick={this.toggleVisibility}>Submit Quest</button>
				</form>
			)}
			</div>
		);
	}
}



ReactDOM.render(<Game/>, document.getElementById("gameconsole"));