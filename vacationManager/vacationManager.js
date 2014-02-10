/*******************************************************************************
 *
 * This mod portion allows a user to make the game go much smoother by 
 * automatically adding points to each employees over time.
 *
 ******************************************************************************/
(function(){

	//Create the Simplicity module
	CrazyCodr.VacationManager = {};

	/**
	 * Create the vacation manager menu item and the associated dialog item
	 */
	CrazyCodr.VacationManager.setupVacationManagerMenuItem = function(){

		//Setup a callback for when a game loads
		//It will create the vacation manager dialog and popupmenu button
		GDT.on(GDT.eventKeys.saves.loading, function(){

			//Create a dialog
			CrazyCodr.VacationManager.Dialog = crazycodr.api.dialogs.createDialog('crazycodr-vacation-manager', {});
			CrazyCodr.VacationManager.Dialog.show();

			//Setup the popup menu item
			UltimateLib.PopupMenu.addItem(
				UltimateLib.PopupMenu.createItem('Manage vacations', CrazyCodr.VacationManager.Dialog, true)
			);
			UltimateLib.PopupMenu.update();

		});

		//When the dialog opens, check the dialog and update it
		GDT.on(GDT.eventKeys.ui.dialogOpen, function(){

			//Only work with the managerContainer
			if($(this).attr('id') != 'crazycodr-vacation-managerContainer')
			{
				return;
			}

			//Clear the existing sections
			UltimateLib.Dialog.clearSections(this);

			//Create a section for each employee and a button to send the employee on vacation if needed
			if(GameManager.company.staff.length > 1)
			{
				for(x = 1; x < GameManager.company.staff.length; x++)
				{

					//Calculate the time until next vacation
					var currentGameTime = GameManager.gameTime;
					var nextVacationGameTime = GameManager.company.staff[x].flags.nextVacation;
					var nextVacationUntilGameTime = Math.max(nextVacationGameTime - currentGameTime, 0) / (1000 * GameManager.SECONDS_PER_WEEK);
					var nextVacationUntilYears = Math.round(nextVacationUntilGameTime / (12 * 4), 0);
					var nextVacationUntilMonths = Math.round((nextVacationUntilGameTime - (nextVacationUntilYears * 12 * 4)) / 4, 0);
					var nextVacationUntilWeeks = Math.round((nextVacationUntilGameTime - (nextVacationUntilYears * 12 * 4) - (nextVacationUntilMonths * 4)), 0);
					var nextVacationUntilString = '';
					if(nextVacationUntilYears > 0)
					{
						nextVacationUntilString += nextVacationUntilYears + 'Y ';
					}
					if(nextVacationUntilMonths > 0)
					{
						nextVacationUntilString += nextVacationUntilMonths + 'M ';
					}
					if(nextVacationUntilWeeks > 0)
					{
						nextVacationUntilString += nextVacationUntilWeeks + 'W ';
					}

					//Create a section and add it to the dialog
					if(nextVacationUntilGameTime == 0)
					{
						var createdSection = UltimateLib.Dialog.createSection(
							'crazycodr-vacation-manager-staff-' + x, 
							GameManager.company.staff[x].name + ' needs to leave for vacation as soon as possible', 
							[
								UltimateLib.Dialog.createButton(
									'crazycodr-vacation-manager-staff-' + x + '-sendButton', 
									'Send on vacation now', 
									'250px', '50px', 
									function(){
										alert('Sending on vacation!');
									}
								)
							]
						);
						UltimateLib.Dialog.addSection(this, createdSection);
					}
					else
					{
						var createdSection = UltimateLib.Dialog.createSection(
							'crazycodr-vacation-manager-staff-' + x, 
							GameManager.company.staff[x].name + ' needs to leave for vacation in "' + nextVacationUntilString, 
							[]
						);
						UltimateLib.Dialog.addSection(this, createdSection);
					}
					
				}
			}
			
		});

	}

	/**
	 * Used to setup the whole mod
	 */
	CrazyCodr.VacationManager.runStartUp = function () {
		CrazyCodr.VacationManager.setupVacationManagerMenuItem();
	};

})();