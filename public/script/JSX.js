"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log("React is on!");

var Game = function (_React$Component) {
	_inherits(Game, _React$Component);

	function Game(props) {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

		_this.handleAddQuest = _this.handleAddQuest.bind(_this);
		_this.state = {
			level: 0,
			quests: ["Quest one", "Quest two", "Quest three"],
			visibility: false
		};
		return _this;
	}

	_createClass(Game, [{
		key: "handleAddQuest",
		value: function handleAddQuest(e) {

			e.preventDefault();

			var quest = e.target.element.quest.value.trim();

			if (quest) {
				this.state.quests.push(quest);
				this.setState({
					quests: this.state.quests
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(Header, { level: this.state.level }),
				React.createElement(QuestLog, { quests: this.state.quests }),
				React.createElement(AddQuest, { quests: this.state.quests, addQuest: this.handleAddQuest,
					visibility: this.state.visibility
				})
			);
		}
	}]);

	return Game;
}(React.Component);

;

var Header = function (_React$Component2) {
	_inherits(Header, _React$Component2);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					this.props.level
				)
			);
		}
	}]);

	return Header;
}(React.Component);

;

var QuestLog = function (_React$Component3) {
	_inherits(QuestLog, _React$Component3);

	function QuestLog() {
		_classCallCheck(this, QuestLog);

		return _possibleConstructorReturn(this, (QuestLog.__proto__ || Object.getPrototypeOf(QuestLog)).apply(this, arguments));
	}

	_createClass(QuestLog, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"ul",
					null,
					this.props.quests.map(function (quest) {
						return React.createElement(Quest, { key: quest, questText: quest });
					})
				)
			);
		}
	}]);

	return QuestLog;
}(React.Component);

var Quest = function (_React$Component4) {
	_inherits(Quest, _React$Component4);

	function Quest() {
		_classCallCheck(this, Quest);

		return _possibleConstructorReturn(this, (Quest.__proto__ || Object.getPrototypeOf(Quest)).apply(this, arguments));
	}

	_createClass(Quest, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				this.props.questText
			);
		}
	}]);

	return Quest;
}(React.Component);

var AddQuest = function (_React$Component5) {
	_inherits(AddQuest, _React$Component5);

	function AddQuest(props) {
		_classCallCheck(this, AddQuest);

		var _this5 = _possibleConstructorReturn(this, (AddQuest.__proto__ || Object.getPrototypeOf(AddQuest)).call(this, props));

		_this5.state = {
			visibility: _this5.props.visibility
		};
		_this5.toggleVisibility = _this5.toggleVisibility.bind(_this5);
		return _this5;
	}

	_createClass(AddQuest, [{
		key: "toggleVisibility",
		value: function toggleVisibility() {
			this.setState(function (prevState) {
				return {
					visibility: !prevState.visibility
				};
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"button",
					{ onClick: this.toggleVisibility },
					"Add Quest"
				),
				this.state.visibility && React.createElement(
					"form",
					{ onSubmit: this.props.addQuest },
					React.createElement("input", { type: "text", name: "quest" }),
					React.createElement("button", { onClick: this.toggleVisibility, type: "button", name: "Submit!" })
				)
			);
		}
	}]);

	return AddQuest;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("gameconsole"));
