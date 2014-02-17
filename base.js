var CrazyCodr = {};

(function(){

	//Setup the data for the mod
	CrazyCodr.id = '10a82c7591b4aac0134dbfc310ad61d0f4836eb093f963028c052b8bb2b3076d';

	/**
	 * Ready function triggers all the setup functions of each portion of the mod
	 * It occurs after the loadJS functions have completed successfully
	 */
	var ready = function(){

		//Simplicity module initialization
		CrazyCodr.Simplicity.runStartUp();

		////Snap grid initialization
		//$.extend($.ui.slider.prototype.options, {
		//    step: 16.67
		//});
	
	};

	/**
	 * Error function runs only when the loadJs didn't resolve properly
	 */
	var error = function(){
	};

	/**
	 * Trigger a loading of all required mod/api files
	 */
	GDT.loadJs([

		//Load the GDT API
		'mods/gdt-modAPI/api/events.js',

		//Load simplicity
		'mods/crazymod/simplicity/simplicity.js',

	], ready, error);
    
})();
