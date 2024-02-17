/*:
* @plugindesc Allow touch-input on the black borders.
* @author GamesOfShadows
* @help
* With this plugin (for RPGmaker MV & MZ) you can allow left- &
* right-click input on the black borders.
* 
* You can also activate a switch or common event.
* 
* If you resize your game, you can get those black borders,
* good for e.g. minigames on smartphone.
* 
* To block Touch-Movement you can use other plugins like
* "POR_InputBlockKM" by Poryg
* https://github.com/Poryg1/RPG-maker-MV-small-plugins/blob/master/POR_InputBlockKM.js
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
* @target MZ
* 
* @param allowLeftClickOutsideCanvas
* @text Allow left click
* @desc Allow left click on black border
* @type select
* @option Allow
* @value Allow
* @option Allow, but change to right-click
* @value AllowButChange
* @option Allow, but activate switch
* @value AllowButUseSwitch
* @option Allow, but activate common-event
* @value AllowButUseCE
* @option Deny
* @value Deny
* @default Allow
* 
* @param allowRightClickOutsideCanvas
* @text Allow right click
* @desc Allow right click on black border
* @type select
* @option Allow
* @value Allow
* @option Allow, but change to left-click
* @value AllowButChange
* @option Allow, but activate switch
* @value AllowButUseSwitch
* @option Allow, but activate common-event
* @value AllowButUseCE
* @option Deny
* @value Deny
* @default Allow
* 
* @param IDforLeftClickOutsideCanvas
* @text Left-Click Switch/CE (Id)
* @desc Activate switch or common-event with given Id
* @type number
* @default 0
* 
* @param IDforRightClickOutsideCanvas
* @text Right-Click Switch/CE (Id)
* @desc Activate switch or common-event with given Id
* @type number
* @default 0
*/

(() => {
	const pluginName = "GoS_BlackBorderTouch";
	let LeftClick = PluginManager.parameters(pluginName).allowLeftClickOutsideCanvas;
	let RightClick = PluginManager.parameters(pluginName).allowRightClickOutsideCanvas;
	let IDforLeftClick = PluginManager.parameters(pluginName).IDforLeftClickOutsideCanvas;
	let IDforRightClick = PluginManager.parameters(pluginName).IDforRightClickOutsideCanvas;
	TouchInput._onLeftButtonDown = function(event) {
		const x = Graphics.pageToCanvasX(event.pageX);
		const y = Graphics.pageToCanvasY(event.pageY);
		if (Graphics.isInsideCanvas(x, y) || LeftClick == "Allow") {
			this._mousePressed = true;
			this._pressedTime = 0;
			Graphics.isInsideCanvas(x, y) ? this._onTrigger(x, y) : "";
		} else if (LeftClick == "AllowButChange") {
			this._onCancel(x, y);
		} else if (LeftClick == "AllowButUseSwitch") {
			$gameSwitches.setValue(IDforLeftClick, true);
		} else if (LeftClick == "AllowButUseCE") {
			$gameTemp.reserveCommonEvent(IDforLeftClick);
		};
	};

	TouchInput._onRightButtonDown = function(event) {
		const x = Graphics.pageToCanvasX(event.pageX);
		const y = Graphics.pageToCanvasY(event.pageY);
		if (Graphics.isInsideCanvas(x, y) || RightClick == "Allow") {
			this._onCancel(x, y);
		} else if (RightClick == "AllowButChange") {
			this._mousePressed = true;
			this._pressedTime = 0;
			Graphics.isInsideCanvas(x, y) ? this._onTrigger(x, y) : "";
		} else if (RightClick == "AllowButUseSwitch") {
			$gameSwitches.setValue(IDforLeftClick, true);
		} else if (RightClick == "AllowButUseCE") {
			$gameTemp.reserveCommonEvent(IDforLeftClick);
		};
	};

})();