/*:
* @plugindesc Change steps for font sizing and/or change default font sizes
* MV-Version!
* @author GamesOfShadows
* @help
* With this plugin you can change the steps for the font sizing,
* so you can make your text 'x' smaller and 'y' bigger using \} and \{.
* 
* Also, you can change the default font size.
* Warning: Window-Size / Message-Box, etc. will be not affected / scaled!
* 
* To deactivate one of those "features" just use the value 0.
* RPGmaker MV default font-size: 28
* 
* - Change default system font size
* (titlescreen, menu & options, name input, etc. - should affect everything)
* 
* - Change text-message font size
* (only change text-message and scroll-text)
* 
* - Change Battle-Text-Message font size
* (only change text-message in battles)
* 
* - Change Number-Input font size
* (only change number-input font size - also affects the text-message)
* 
* ------------------------------------------------------------
* 
* - Plugin-Commands (MV) - Change the settings later ingame:
* 
* makeFontBigger x
* 
* makeFontSmaller x
* 
* maxFontSize x
* 
* minFontSize x
* 
* defaultSystemFontSize x
* 
* resetDefaultSystemFontSize
* 
* (replace x with a number)
* 
* Example: makeFontBigger 5
* 
* 
* ------------------------------------------------------------
* 
* PS: I'm still "beginner" to something "advanced" regarding JS.
* If there are problems with a plugin,
* I will probably NOT be able to solve them!
* 
* ------------------------------------------------------------
* 
* Version: 1.1
* 
* - You can do everything you want with this plugin
* - You can use it commercially
* - You DON'T need to credit me
* 
* It's just a short & simple plugin. ^^
* 
* @target MV
* 
* @param makeFontBigger
* @text Make font bigger
* @desc Size / value by which to increase the font size (\{)
* To deactivate this just use: 0
* @type number
* @default 4
* 
* @param makeFontSmaller
* @text Make font smaller
* @desc Size / value by which to decrease the font size (\})
* To deactivate this just use: 0
* @type number
* @default 4
* 
* @param maxFontSize
* @text Max. font size
* @desc Max. size of the font (\{)
* Only in combination with "Make font bigger"
* @type number
* @default 100
* 
* @param minFontSize
* @text Min. font size
* @desc Min. size of the font (\})
* Only in combination with "Make font smaller"
* @type number
* @default 8
* 
* @param defaultSystemFontSize
* @text Default System font size
* @desc Set the default font size for all system stuff (default 28).
* To deactivate this just use: 0
* @type number
* @default 0
* 
* @param defaultMessageFontSize
* @text Default Message font size
* @desc Set the default font size for text-message & scroll-text.
* Deactivate this / use Default System font size, just use: 0
* @type number
* @default 0
* 
* @param defaultBattleMessageFontSize
* @text Default Battle-Message font size
* @desc Set the default font size for text-message in battles.
* Deactivate this / use Default System font size, just use: 0
* @type number
* @default 0
* 
* @param defaultNumberInputFontSize
* @text Default Number-Input font size
* @desc Set the default font size for Number-Input.
* Deactivate this / use Default System font size, just use: 0
* @type number
* @default 0
*/

(() => {
	const pluginName = "GoS_FontSize_MV";
	let GoS_makeFontBigger = Number(PluginManager.parameters(pluginName).makeFontBigger);
	let GoS_makeFontSmaller = Number(PluginManager.parameters(pluginName).makeFontSmaller);
	let GoS_maxFontSize = Number(PluginManager.parameters(pluginName).maxFontSize);
	let GoS_minFontSize = Number(PluginManager.parameters(pluginName).minFontSize);
	let GoS_defaultSystemFontSize = Number(PluginManager.parameters(pluginName).defaultSystemFontSize);
	let GoS_defaultMessageFontSize = Number(PluginManager.parameters(pluginName).defaultMessageFontSize);
	let GoS_defaultBattleMessageFontSize = Number(PluginManager.parameters(pluginName).defaultBattleMessageFontSize);
	let GoS_defaultNumberInputFontSize = Number(PluginManager.parameters(pluginName).defaultNumberInputFontSize);
	
	if (GoS_defaultSystemFontSize > 0) {	
		Window_Base.prototype.standardFontSize = function() {
			console.log("GoS_defaultSystemFontSize");
			if (GoS_defaultSystemFontSize > 0) {
				return GoS_defaultSystemFontSize;
			} else {
				return 28;
			};
		};
	};
	
	if (GoS_makeFontBigger > 0) {	
		Window_Base.prototype.makeFontBigger = function() {
			if (this.contents.fontSize <= GoS_maxFontSize) {
				this.contents.fontSize += GoS_makeFontBigger;
			};
		};
	};
	
	if (GoS_makeFontSmaller > 0) {
		Window_Base.prototype.makeFontSmaller = function() {
			if (this.contents.fontSize >= GoS_minFontSize) {
				this.contents.fontSize -= GoS_makeFontSmaller;
			};
		};
	};
	
	if (GoS_defaultMessageFontSize > 0 || GoS_defaultBattleMessageFontSize > 0 || GoS_defaultNumberInputFontSize > 0) {
		Window_Base.prototype.resetFontSettings = function() {
			console.log("edit");
			this.contents.fontFace = this.standardFontFace();
			if (GoS_defaultMessageFontSize > 0 && $gameMessage.isBusy() && !$gameTroop._inBattle && !$gameMessage.isNumberInput()) {
				this.contents.fontSize = GoS_defaultMessageFontSize;
			} else if (GoS_defaultBattleMessageFontSize > 0 && $gameMessage.isBusy() && $gameTroop._inBattle) {
				this.contents.fontSize = GoS_defaultBattleMessageFontSize;
			} else if (GoS_defaultNumberInputFontSize > 0 && $gameMessage.isNumberInput()) {
				this.contents.fontSize = GoS_defaultNumberInputFontSize;
			} else {
				this.contents.fontSize = this.standardFontSize();
			};
			this.resetTextColor();
		};
	};
	
	//Plugin Commands (MV)
	if (Utils.RPGMAKER_NAME == "MV") {
		var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
		Game_Interpreter.prototype.pluginCommand = function(command, args) {
			_Game_Interpreter_pluginCommand.call(this, command, args);
			
			if (command === 'makeFontBigger') {
				if (args.length >= 1) {
					GoS_makeFontBigger = Number(args[0]);
					Window_Base.prototype.makeFontBigger = function() {
						if (this.contents.fontSize <= GoS_maxFontSize) {
							this.contents.fontSize += GoS_makeFontBigger;
						};
					};
				};
			} else if (command === 'makeFontSmaller') {
				if (args.length >= 1) {
					GoS_makeFontSmaller = Number(args[0]);
					Window_Base.prototype.makeFontSmaller = function() {
						if (this.contents.fontSize >= GoS_minFontSize) {
							this.contents.fontSize -= GoS_makeFontSmaller;
						};
					};
				};
			} else if (command === 'maxFontSize') {
				if (args.length >= 1) {
					GoS_maxFontSize = Number(args[0]);
					Window_Base.prototype.makeFontBigger = function() {
						if (this.contents.fontSize <= GoS_maxFontSize) {
							this.contents.fontSize += GoS_makeFontBigger;
						};
					};
				};
			} else if (command === 'minFontSize') {
				if (args.length >= 1) {
					GoS_minFontSize = Number(args[0]);
					Window_Base.prototype.makeFontSmaller = function() {
						if (this.contents.fontSize >= GoS_minFontSize) {
							this.contents.fontSize -= GoS_makeFontSmaller;
						};
					};
				};
			} else if (command === 'defaultSystemFontSize') {
				if (args.length >= 1) {
					Window_Base.prototype.standardFontSize = function() {
						return Number(args[0]);
					};
				};
			} else if (command === 'resetDefaultFontSize') {
				Window_Base.prototype.standardFontSize = function() {
					return GoS_defaultSystemFontSize;
				};
			};
		};
	};
})();