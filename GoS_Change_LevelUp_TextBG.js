/*:
* @plugindesc Change background of Level-Up Textbox
* @author GamesOfShadows
* @help
* With this plugin (for RPGmaker MV & MZ) you can change the background of the Level-Up-Text.
* 
* ------------------------------------------------------------
* 
* Version: 1.0
* 
* - You can do everything you want with this plugin
* - You can use it commercially
* - You DON'T need to credit me
* 
* It's just a short & simple plugin. ^^
* 
* @target MV
* 
* @param SetBackground
* @text Change the background
* @desc 0 = window / normal, 1 = dim, 2 = transparent
* @type number
* @default 1
*/

(() => {
	const pluginName = "GoS_Change_LevelUp_TextBG";
	var GoS_SetBackground = Number(PluginManager.parameters(pluginName).SetBackground);
	
//Plugin Commands (MZ)
	if (Utils.RPGMAKER_NAME == "MZ") {
		Game_Actor.prototype.displayLevelUp = function(newSkills) {
			const text = TextManager.levelUp.format(
				this._name,
				TextManager.level,
				this._level
			);
			$gameMessage.setBackground(GoS_SetBackground);
			$gameMessage.newPage();
			$gameMessage.add(text);
			for (const skill of newSkills) {
				$gameMessage.add(TextManager.obtainSkill.format(skill.name));
			}
		};
	};

//Plugin Commands (MV)
	if (Utils.RPGMAKER_NAME == "MV") {
		Game_Actor.prototype.displayLevelUp = function(newSkills) {
			var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
			$gameMessage.newPage();
			$gameMessage.setBackground(GoS_SetBackground);
			$gameMessage.add(text);
			newSkills.forEach(function(skill) {
				$gameMessage.add(TextManager.obtainSkill.format(skill.name));
			});
		};
	};
})();