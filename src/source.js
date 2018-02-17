console.log("React is on!");

class Game extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			level: 0,
			quests: ["Quest one", "Quest two", "Quest three"]
		};
	}

	render(){
		return(
		<div>
			<Header level = {this.state.level} />
			<QuestLog quests={this.state.quests}/>
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



ReactDOM.render(<Game/>, document.getElementById("gameconsole"));