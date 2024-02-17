/*:
* @plugindesc Change steps for font sizing and/or change default font sizes
* MZ-Version!
* @author GamesOfShadows
* @help
* With this plugin you can change the steps for the font sizing,
* so you can make your text 'x' smaller and 'y' bigger using \} and \{.
* 
* Also, you can change the default font size.
* Warning: Window-Size / Message-Box, etc. will be not affected / scaled!
* 
* To deactivate one of those "features" just use the value 0.
* RPGmaker MZ default font-size: 26
* 
* - Change default system font size (in-game / via plugin-command)
* (to change the default system font size go into "Database" -> "System 2")
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
* @param defaultMessageFontSize
* @text Default Message font size
* @desc Set the default font size for text-message & scroll-text.
* Deactivate this / use Default System font size, use: 0
* @type number
* @default 0
* 
* @param defaultBattleMessageFontSize
* @text Default Battle-Message font size
* @desc Set the default font size for text-message in battles.
* Deactivate this / use Default System font size, use: 0
* @type number
* @default 0
* 
* @param defaultNumberInputFontSize
* @text Default Number-Input font size
* @desc Set the default font size for Number-Input.
* Deactivate this / use Default System font size, use: 0
* @type number
* @default 0
* 
* @target MZ
* 
* @command change_FontSizeSettings
* @text Change Plugin-Settings
* @desc Change / adjust or reset the settings
* 
* @arg change_makeFontBigger
* @text makeFontBigger
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default 0
* 
* @arg change_makeFontSmaller
* @text makeFontSmaller
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default 0
* 
* @arg change_maxFontSize
* @text maxFontSize
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default 0
* 
* @arg change_minFontSize
* @text minFontSize
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default 0
* 
* @arg change_defaultSystemFontSize
* @text defaultSystemFontSize
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default reset
* 
* @arg change_defaultMessageFontSize
* @text defaultMessageFontSize
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default 0
* 
* @arg change_defaultBattleMessageFontSize
* @text defaultBattleMessageFontSize
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default 0
* 
* @arg change_defaultNumberInputFontSize
* @text defaultNumberInputFontSize
* @desc Input a Number (0 = don't change)
* or input text like 'reset' = reset this setting
* @type number
* @default 0
*/

(() => {
	const pluginName = "GoS_FontSize_MZ";
	let GoS_makeFontBigger = Number(PluginManager.parameters(pluginName).makeFontBigger);
	let GoS_makeFontSmaller = Number(PluginManager.parameters(pluginName).makeFontSmaller);
	let GoS_maxFontSize = Number(PluginManager.parameters(pluginName).maxFontSize);
	let GoS_minFontSize = Number(PluginManager.parameters(pluginName).minFontSize);
	let GoS_defaultSystemFontSize = 0;
	let GoS_defaultMessageFontSize = Number(PluginManager.parameters(pluginName).defaultMessageFontSize);
	let GoS_defaultBattleMessageFontSize = Number(PluginManager.parameters(pluginName).defaultBattleMessageFontSize);
	let GoS_defaultNumberInputFontSize = Number(PluginManager.parameters(pluginName).defaultNumberInputFontSize);
	
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
			this.contents.fontFace = $gameSystem.mainFontFace();
			if (GoS_defaultMessageFontSize > 0 && $gameMessage.isBusy() && !$gameTroop._inBattle && !$gameMessage.isNumberInput()) {
				this.contents.fontSize = GoS_defaultMessageFontSize;
			} else if (GoS_defaultBattleMessageFontSize > 0 && $gameMessage.isBusy() && $gameTroop._inBattle) {
				this.contents.fontSize = GoS_defaultBattleMessageFontSize;
			} else if (GoS_defaultNumberInputFontSize > 0 && $gameMessage.isNumberInput()) {
				this.contents.fontSize = GoS_defaultNumberInputFontSize;
			} else {
				this.contents.fontSize = $gameSystem.mainFontSize();
			};
			this.resetTextColor();
		};
	};
	
	//Plugin Commands (MZ)
	PluginManager.registerCommand(pluginName, "change_FontSizeSettings", args => {
		if (parseInt(args.change_makeFontBigger) >= 0) {
			if (Number(args.change_makeFontBigger) > 0) {
				GoS_makeFontBigger = Number(args.change_makeFontBigger);
			};
		} else {
			GoS_makeFontBigger = Number(PluginManager.parameters(pluginName).makeFontBigger);
		};
		
		if (parseInt(args.change_makeFontSmaller) >= 0) {
			if (Number(args.change_makeFontSmaller) > 0) {
				GoS_makeFontSmaller = Number(args.change_makeFontSmaller);
			};
		} else {
			GoS_makeFontSmaller = Number(PluginManager.parameters(pluginName).makeFontSmaller);
		};
		
		if (parseInt(args.change_maxFontSize) >= 0) {
			if (Number(args.change_maxFontSize) > 0) {
				GoS_maxFontSize = Number(args.change_maxFontSize);
			};
		} else {
			GoS_maxFontSize = Number(PluginManager.parameters(pluginName).maxFontSize);
		};
		
		if (parseInt(args.change_minFontSize) >= 0) {
			if (Number(args.change_minFontSize) > 0) {
				GoS_minFontSize = Number(args.change_minFontSize);
			};
		} else {
			GoS_minFontSize = Number(PluginManager.parameters(pluginName).minFontSize);
		};
		
		if (parseInt(args.change_defaultSystemFontSize) >= 0) {
			if (Number(args.change_defaultSystemFontSize) > 0) {
				GoS_defaultSystemFontSize = Number(args.change_defaultSystemFontSize);
			};
		} else {
			GoS_defaultSystemFontSize = 0;
		};
		
		if (parseInt(args.change_defaultMessageFontSize) >= 0) {
			if (Number(args.change_defaultMessageFontSize) > 0) {
				GoS_defaultMessageFontSize = Number(args.change_defaultMessageFontSize);
			};
		} else {
			GoS_defaultMessageFontSize = Number(PluginManager.parameters(pluginName).defaultMessageFontSize);
		};
		
		if (parseInt(args.change_defaultBattleMessageFontSize) >= 0) {
			if (Number(args.change_defaultBattleMessageFontSize) > 0) {
				GoS_defaultBattleMessageFontSize = Number(args.change_defaultBattleMessageFontSize);
			};
		} else {
			GoS_defaultBattleMessageFontSize = Number(PluginManager.parameters(pluginName).defaultBattleMessageFontSize);
		};
		
		if (parseInt(args.change_defaultNumberInputFontSize) >= 0) {
			if (Number(args.change_defaultNumberInputFontSize) > 0) {
				GoS_defaultNumberInputFontSize = Number(args.change_defaultNumberInputFontSize);
			};
		} else {
			GoS_defaultNumberInputFontSize = Number(PluginManager.parameters(pluginName).defaultNumberInputFontSize);
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
		
		if (GoS_defaultSystemFontSize > 0 || GoS_defaultMessageFontSize > 0 || GoS_defaultBattleMessageFontSize > 0 || GoS_defaultNumberInputFontSize > 0) {
			Window_Base.prototype.resetFontSettings = function() {
				this.contents.fontFace = $gameSystem.mainFontFace();
				if (GoS_defaultMessageFontSize > 0 && $gameMessage.isBusy() && !$gameTroop._inBattle && !$gameMessage.isNumberInput()) {
					this.contents.fontSize = GoS_defaultMessageFontSize;
				} else if (GoS_defaultBattleMessageFontSize > 0 && $gameMessage.isBusy() && $gameTroop._inBattle) {
					this.contents.fontSize = GoS_defaultBattleMessageFontSize;
				} else if (GoS_defaultNumberInputFontSize > 0 && $gameMessage.isNumberInput()) {
					this.contents.fontSize = GoS_defaultNumberInputFontSize;
				} else if (GoS_defaultSystemFontSize > 0) {
					this.contents.fontSize = GoS_defaultSystemFontSize;
				} else {
					this.contents.fontSize = $gameSystem.mainFontSize();
				};
				this.resetTextColor();
			};
		};
	});
})();