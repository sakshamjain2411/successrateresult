sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"./CustomerFormat",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	"sap/ui/export/Spreadsheet"
], function(Controller, CustomerFormat, Export, ExportTypeCSV, Spreadsheet) {
	// "use strict";

	return Controller.extend("successrateresult.controller.Level3", {
		_selectedData: [],
		onInit: function() {
			setInterval(function() {

				if (window.location.href.split("siteId=")[1] == "146d771f-cf10-4920-9a7d-b31972423c89#Shell-home") {
					// if (self.stat == true) {} else {
					// 	jQuery.sap.includeStyleSheet("../../../../sap/fiori/zmpsaleschips/WebContent/tiles/Lpcust.css", "CUST");
					// }
					// self.stat = true;
					$(".sapUshellHeadTitle").text("Home");
				} else {
					// if (self.stat == false) {} else {
					// 	jQuery.sap.includeStyleSheet("../../../../sap/fiori/zmpsaleschips/WebContent/tiles/Lpcust2.css", "CUST");
					// }
					// self.stat = false;

					$(".sapUshellHeadTitle").text("Best Practices Usage Dashboard");
				}
			}, 100);
		},
		boldName: function(sName) {
			if (sName != null) {
				return sName.toString().replace(/,/g, '\n');
			}
		},
		defaultname:function(sName){
			return sName;
		},
		defaultnameNo:function(sName){
			if(sName!=null){
				var modelAdmin = sap.ui.getCore().getModel("superadmin").getData();
				if (modelAdmin=="superadmin") {
					return sName;
				}else{
					var res = sName.slice(0, 2);
					return res+"***";
				}
			}
		},
		onAfterRendering: async function() {
			var superadmin = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(superadmin, "superadmin");
			superadmin.setData("");
			
            if (sap.ushell && sap.ushell.cpv2 && sap.ushell.cpv2.services && sap.ushell.cpv2.services.cloudServices && sap.ushell.cpv2.services.cloudServices.SiteService) {

                var oLocalSiteService = sap.ushell.cpv2.services.cloudServices.SiteService();
                var oRoles = oLocalSiteService.siteModel.getProperty("/roles");
                var oProperty;


                for (oProperty in oRoles) {

                    if (oRoles.hasOwnProperty(oProperty)) {
                        if (oProperty.toString() === "SiteAdmin"){
				/// Some action based on the Test_Role
							superadmin.setData("superadmin");
                        }
                    }
                }
            }
            
			document.title = "Best Practices Dashboard";
			
			this.getView().setModel(new sap.ui.model.json.JSONModel([]), "testModelTile");

			/**
			 * default date range selection  
			 * */
			var Datetoday = new Date();
			var tDate = Datetoday.YYYYMMDD();
			var fDate = new Date();
			fDate.setMonth((fDate.getMonth() - 3));
			fDate.setDate(fDate.getDate() + 1);
			if(fDate.getDate()!=1){
				fDate.setDate(1);
			}
			
			fDate = fDate.YYYYMMDD();

			/** 
			 * date range functionality
			 * */
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				delimiterDRS1: "~",
				dateValueDRS1: stringToDate(fDate),
				secondDateValueDRS1: stringToDate(tDate),
				dateFormatDRS1: "yyyy-MM-dd"
			});
			// sap.ui.getCore().setModel(oModel, 'dateModel');

			this.getView().byId("dateviewrange").setDateValue(stringToDate(fDate));
			this.getView().byId("dateviewrange").setSecondDateValue(stringToDate(tDate));

			var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
			if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Month") {
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 30) + 1);
				// fromDate = fromDate.YYYYMMDD();
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn3Month") {
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 3));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn6Month") {
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 6));
				fromDate.setDate(fromDate.getDate() + 1);
				// fromDate = fromDate.YYYYMMDD();
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Year") {
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 12));
				fromDate.setDate(fromDate.getDate() + 1);
				// fromDate = fromDate.YYYYMMDD();
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn2Year") {
				var Datetoday = new Date();
				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 24));
				fromDate.setDate(fromDate.getDate() + 1);
				// fromDate = fromDate.YYYYMMDD();
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			}

			let aResponse;
			const sServiceURL = this.getOwnerComponent().getManifestObject().resolveUri(`odata/v4/report/UpgradeElements`);
			aResponse = (await (await fetch(sServiceURL.concat(`?$filter=PRODUCT_NAME eq 'Employee Central'`))).json());
            const oModelUpgradeRecruitEC = new sap.ui.model.json.JSONModel(aResponse.value);
			sap.ui.getCore().setModel(oModelUpgradeRecruitEC, "oModelUpgradeRecruitEC");

			aResponse = (await (await fetch(sServiceURL.concat(`?$filter=PRODUCT_NAME eq 'Succession Management'`))).json());
            const oModelUpgradeRecruitSM = new sap.ui.model.json.JSONModel(aResponse.value);
			sap.ui.getCore().setModel(oModelUpgradeRecruitSM, "oModelUpgradeRecruitSM");

			aResponse = (await (await fetch(sServiceURL.concat(`?$filter=PRODUCT_NAME eq 'Performance and Goals'`))).json());
            const oModelUpgradeRecruitPG = new sap.ui.model.json.JSONModel(aResponse.value);
			sap.ui.getCore().setModel(oModelUpgradeRecruitPG, "oModelUpgradeRecruitPG");

			aResponse = (await (await fetch(sServiceURL.concat(`?$filter=PRODUCT_NAME eq 'Compensation'`))).json());
            const oModelUpgradeRecruitCO = new sap.ui.model.json.JSONModel(aResponse.value);
			sap.ui.getCore().setModel(oModelUpgradeRecruitCO, "oModelUpgradeRecruitCO");

			aResponse = (await (await fetch(sServiceURL.concat(`?$filter=PRODUCT_NAME eq 'Onboarding'`))).json());
            const oModelUpgradeRecruitON = new sap.ui.model.json.JSONModel(aResponse.value);
			sap.ui.getCore().setModel(oModelUpgradeRecruitON, "oModelUpgradeRecruitON");

			aResponse = (await (await fetch(sServiceURL.concat(`?$filter=PRODUCT_NAME eq 'Recruiting Management'`))).json());
            const oModelUpgradeRecruitREC = new sap.ui.model.json.JSONModel(aResponse.value);
			sap.ui.getCore().setModel(oModelUpgradeRecruitREC, "oModelUpgradeRecruitREC");
			
			let sURL = this.getOwnerComponent().getManifestObject().resolveUri("sap/sfsf_repo/service/services.xsodata/");
			var ODataModel = new sap.ui.model.odata.ODataModel(sURL, true); // Changes made on 16/03/2017 and on 16/03/2018
			ODataModel.setDefaultCountMode(false);
			ODataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.getView().setModel(ODataModel);
			
			var oModelUpgradeRefData = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefData.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefData, "oModelUpgradeRefData");
			
			
			var oModelUpgradeRefDataUpgrade = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefDataUpgrade.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefDataUpgrade, "oModelUpgradeRefDataUpgrade");

			this.loadTileData(ODataModel, "", fromCompDate, toCompDate, "");
			this.loadDDlUpgrade(ODataModel, "", fromCompDate, toCompDate, "");
			this.CallCustomerData(ODataModel, "", fromCompDate, toCompDate, "");
			this.loadSuccessChartSub(ODataModel, "", fromCompDate, toCompDate, "");
			this.loadCustomerList(ODataModel, "", fromCompDate, toCompDate, "");
			this.loadDDlVersion(ODataModel, fromCompDate, toCompDate);
			// this.loadChartBottom(ODataModel, "", fromCompDate,toCompDate);

		},
		
		onSearch: function(oEvt) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("val", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("listTable");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},
		ddlScopeChanged:function(oEvt){
			var self = this;
			self.stat = true;
			self.state = false;

			if (self.stat == true) {
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn3Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn6Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}


					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn1Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn2Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				}else{
					var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
					var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
	
					var fromCompDate = fromDateVal.toISOString();
					var toCompDate = toDateVal.toISOString();
				}
			} else {
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();

				var fromCompDate = fromDateVal.toISOString();
				var toCompDate = toDateVal.toISOString();
			}
			
			var mdl = this.getView().getModel();
			
			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			this.showBusyIndicator(10000, 0);
			
			this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
			this.ddlSPChangedSuccess();
			this.getView().byId("searchfield").setValue("");
			this.loadTileData(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadDDlUpgrade(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadSuccessChartSub(mdl, tempKey, fromCompDate, toCompDate, "");
			this.CallCustomerData(mdl, tempKey, fromCompDate, toCompDate, "");
			// this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
		
			
		},
		ddlProductChanged:function(oEvt){
			var self = this;
			self.stat = true;
			self.state = false;

			if (self.stat == true) {
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn3Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn6Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}


					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn1Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn2Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else{
					var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
					var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
	
					var fromCompDate = fromDateVal.toISOString();
					var toCompDate = toDateVal.toISOString();
				}
			} else {
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();

				var fromCompDate = fromDateVal.toISOString();
				var toCompDate = toDateVal.toISOString();
			}
			
			var mdl = this.getView().getModel();
			
			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			this.showBusyIndicator(10000, 0);
			
			this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
			this.ddlSPChangedSuccess();
			this.getView().byId("searchfield").setValue("");
			this.loadTileData(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadDDlUpgrade(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadSuccessChartSub(mdl, tempKey, fromCompDate, toCompDate, "");
			this.CallCustomerData(mdl, tempKey, fromCompDate, toCompDate, "");
			// this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
		},
		ddlVersionChanged: function() {
			var self = this;
			self.stat = true;
			self.state = false;

			if (self.stat == true) {
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn3Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn6Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}


					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn1Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn2Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					// fromDate = fromDate.YYYYMMDD();
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				}else{
					var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
					var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
	
					var fromCompDate = fromDateVal.toISOString();
					var toCompDate = toDateVal.toISOString();
				}
			} else {
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();

				var fromCompDate = fromDateVal.toISOString();
				var toCompDate = toDateVal.toISOString();
			}

			var mdl = this.getView().getModel();

			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if(tempKey!="Version"&&tempKey!="b1808/"&&tempKey!="b1811/"&&tempKey!="b1902/"&&tempKey!="b1905/"&&tempKey!="b1908/"&&tempKey!="b1911/"&&tempKey!="b2002/"&&tempKey!="b2005/"&&tempKey!="b2008/"&&tempKey!="b2011/"&&tempKey!=""){
				this.getView().byId("ddlProd").setSelectedKey("EC");
				this.getView().byId("ddlProd").setEnabled(false);
			}else{
				this.getView().byId("ddlProd").setSelectedKey("All");
				this.getView().byId("ddlProd").setEnabled(true);
			}
			if (tempKey == "Version") {
				tempKey = "";
			}
			
this.showBusyIndicator(10000, 0);

			this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
			this.ddlSPChangedSuccess();
			this.getView().byId("searchfield").setValue("");
			this.loadTileData(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadDDlUpgrade(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadSuccessChartSub(mdl, tempKey, fromCompDate, toCompDate, "");
			this.CallCustomerData(mdl, tempKey, fromCompDate, toCompDate, "");
			// this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
		},

		ddlSPChangedSuccess: function() {
			var _temp1 = "";
			var _temp2 = "";

			var fillBP = "";
			var fillBPAry = [];
			var tmpStrg = "";
			var self = this;
			this.getView().byId("searchfield").setValue("");

			if (this.getView().byId("ddlSPSuccess").getSelectedKeys().length == 0) {
				this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
				fillBP = "";
			} else if (this.getView().byId("ddlSPSuccess").getSelectedKeys().length == 1) {
				var tempArray = this.getView().byId("ddlSPSuccess").getSelectedKeys();
				if (tempArray.indexOf("All") > -1) {
					fillBP = "";
				} else {
					// tempStr = JSON.stringify(sap.ui.getCore().byId("ddlSPSuccess").getSelectedKeys());
					// _temp1 = (tempStr.split("[")[1]).split("]")[0];
					// _temp2 = _temp1.replace(/("|')/g, "'");
					// that._tempT = _temp2.replace(/,/g, "','");

					for (var q = 0; q < tempArray.length; q++) {
						if (q == tempArray.length - 1) {
							fillBPAry.push("UPGRADE_ELEMENT eq '" + encodeURIComponent(tempArray[q]) + "'");
						} else {
							fillBPAry.push("UPGRADE_ELEMENT eq '" + encodeURIComponent(tempArray[q]) + "' or ");
						}

					}
					tmpStrg = JSON.stringify(fillBPAry);
					_temp1 = (tmpStrg.split("[")[1]).split("]")[0];
					_temp2 = _temp1.replace(/"/g, "");
					fillBP = _temp2.replace(/,/g, "");

				}
			} else {
				var tempArray = this.getView().byId("ddlSPSuccess").getSelectedKeys();
				if (tempArray.indexOf("All") == 0) {
					tempArray.splice(tempArray.indexOf("All"), 1);
					// tempStr = JSON.stringify(tempArray);
					// _temp1 = (tempStr.split("[")[1]).split("]")[0];
					// _temp2 = _temp1.replace(/("|')/g, "'");
					// that._tempT = _temp2.replace(/,/g, "','");

					for (var q = 0; q < tempArray.length; q++) {
						if (q == tempArray.length - 1) {
							fillBPAry.push("UPGRADE_ELEMENT eq '" + encodeURIComponent(tempArray[q]) + "'");
						} else {
							fillBPAry.push("UPGRADE_ELEMENT eq '" + encodeURIComponent(tempArray[q]) + "' or ");
						}

					}
					tmpStrg = JSON.stringify(fillBPAry);
					_temp1 = (tmpStrg.split("[")[1]).split("]")[0];
					_temp2 = _temp1.replace(/"/g, "");
					fillBP = _temp2.replace(/,/g, "");

					this.getView().byId("ddlSPSuccess").setSelectedKeys(tempArray);

				} else if (tempArray.indexOf("All") > 0) {
					this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
					fillBP = "";
				} else {
					// tempStr = JSON.stringify(tempArray);
					// _temp1 = (tempStr.split("[")[1]).split("]")[0];
					// _temp2 = _temp1.replace(/("|')/g, "'");
					// that._tempT = _temp2.replace(/,/g, "','");

					for (var q = 0; q < tempArray.length; q++) {
						if (q == tempArray.length - 1) {
							fillBPAry.push("UPGRADE_ELEMENT eq '" + encodeURIComponent(tempArray[q]) + "'");
						} else {
							fillBPAry.push("UPGRADE_ELEMENT eq '" + encodeURIComponent(tempArray[q]) + "' or ");
						}

					}
					tmpStrg = JSON.stringify(fillBPAry);
					_temp1 = (tmpStrg.split("[")[1]).split("]")[0];
					_temp2 = _temp1.replace(/"/g, "");
					fillBP = _temp2.replace(/,/g, "");
				}

			}

			self.stat = true;
			self.state = false;

			if (self.stat == true) {
				var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
				if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setDate((fromDate.getDate() - 30) + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn3Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 3));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn6Month") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 6));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn1Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 12));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				} else if (tempDateBtn == "btn2Year") {
					var Datetoday = new Date();
					var fromDate = new Date();
					fromDate.setMonth((fromDate.getMonth() - 24));
					fromDate.setDate(fromDate.getDate() + 1);
					if(fromDate.getDate()!=1){
						fromDate.setDate(1);
					}
					// fromDate = fromDate.YYYYMMDD();

					var fromCompDate = fromDate.toISOString();
					var toCompDate = Datetoday.toISOString();
				}else{
					var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
					var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
	
					var fromCompDate = fromDateVal.toISOString();
					var toCompDate = toDateVal.toISOString();
				}
			} else {
				var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
				var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();

				var fromCompDate = fromDateVal.toISOString();
				var toCompDate = toDateVal.toISOString();
			}

			var mdl = this.getView().getModel();

			// var groups = this.getView().byId("ddlVersion").getValue();
			// if (groups == "") {
			// 	this.getView().byId("ddlVersion").setValue("Build Version");
			// 	this.getView().byId("ddlVersion").setSelectedKey("Build Version");
			// }
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			this.showBusyIndicator(10000, 0);

			this.CallCustomerData(mdl, tempKey, fromCompDate, toCompDate, fillBP);

		},

		createColumnConfig: function() {
			var aCols = [];

			// aCols.push({
			// 	label: 'ID',
			// 	type: 'number',
			// 	property: 'UserID',
			// 	scale: 0
			// });
			
			var modelAdmin = sap.ui.getCore().getModel("superadmin").getData();
			if (modelAdmin=="superadmin") {
				aCols.push({
					property: 'val',
					label: 'Company Name',
					type: 'string',
					width: '30'
				});
			}else{
				aCols.push({
					property: 'Default',
					label: 'Company Name',
					type: 'string',
					width: '30'
				});
			}

			// aCols.push({
			// 	property: 'val',
			// 	label: 'Company Name',
			// 	type: 'string',
			// 	width: '30'
			// });

			aCols.push({
				property: 'upgradeString',
				label: 'Upgrade Actions',
				type: 'string',
				width: '30'
			});

			aCols.push({
				label: 'Time Stamp',
				property: 'time',
				type: 'string'
			});

			return aCols;
		},

		testEmail: function() {

			if (!this._oTable) {
				this._oTable = this.byId("listTable");
			}

			var oRowBinding = this._oTable.getBinding("items");

			var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			var aProducts = oModel.getProperty("/stlistUser");

			var oMail = {
				MailFrom: {
					address: "successfactorshcm@sap.com"
				},
				MailTo: [{
					address: "ankit.vashisht@sap.com"
				}],
				Subject: "test",
				MailBody: aProducts
			};

			// $.ajax({
			// 	url: "/utils/mailattach.xsjs",
			// 	type: "POST",
			// 	contentType: "application/json",
			// 	data: JSON.stringify(oMail),
			// 	success: function(data) {
			// 		console.log(data);
			// 	},
			// 	fail: function(data) {
			// 		console.log(data);
			// 	}
			// });
		},
		
		createColumnConfigSuccess: function() {
			var aCols = [];

			aCols.push({
				property: 'Name',
				label: 'Company Name',
				type: 'string',
				width: '30'
			});

			aCols.push({
				label: 'Time Stamp',
				property: 'Time',
				type: 'string'
			});

			return aCols;
		},
		
		
		onExportNoSuccess:function() {
			var me = this;
			var aCols, aProducts, oSettings, oRowBinding;

			if (!this._oTable) {
				this._oTable = this.byId("listTableList");
			}

			oRowBinding = this._oTable.getBinding("items");
			
			var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			aCols = this.createColumnConfigSuccess();
			aProducts = oModel.getData();
			
			
			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aProducts,
				fileName: "Customer List(No Successful Upgrade).xlsx",
				showProgress: false
			};

			var spreadsheet = new Spreadsheet(oSettings)
				.build()
				.then(function() {
					new sap.m.MessageToast.show("Customer List export has finished");

				});
			
		},
		onExport: function() {
			var me = this;
			var aCols, aProducts, oSettings, oRowBinding;

			if (!this._oTable) {
				this._oTable = this.byId("listTable");
			}

			oRowBinding = this._oTable.getBinding("items");

			var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			aCols = this.createColumnConfig();
			aProducts = oModel.getProperty("/stlistUser");

			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aProducts,
				fileName: "Customer List.xlsx",
				showProgress: false
			};

			var spreadsheet = new Spreadsheet(oSettings)
				.build()
				.then(function() {
					new sap.m.MessageToast.show("Customer List export has finished");

				});

			//me.testEmail();

			// var aBoundProperties, aCols, oProperties, oRowBinding, oSettings, oTable, oController;

			// oController = this;

			// if (!this._oTable) {
			// 	this._oTable = this.byId("listTable");
			// }

			// oTable = this._oTable;
			// oRowBinding = oTable.getBinding("items");

			// aCols = this.createColumnConfig();

			// var oModel = oRowBinding.getModel();
			// var oModelInterface = oModel.getInterface();

			// oSettings = {
			// 	workbook: { columns: aCols },
			// 	dataSource: {
			// 		type: "oData",
			// 		dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
			// 		serviceUrl: oModelInterface.sServiceUrl,
			// 		headers: oModelInterface.getHeaders ? oModelInterface.getHeaders() : null,
			// 		count: oRowBinding.getLength ? oRowBinding.getLength() : null,
			// 		useBatch: oModelInterface.bUseBatch,
			// 		sizeLimit: oModelInterface.iSizeLimit
			// 	},
			// 	worker: false // We need to disable worker because we are using a MockServer as OData Service
			// };

			// new Spreadsheet(oSettings).build();
		},

		onDataExport: sap.m.Table.prototype.exportData || function(oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),

				// Pass in the model created above
				models: this.getView().getModel(),

				// binding information for the rows aggregation
				rows: {
					path: "/ProductCollection"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: "Product",
					template: {
						content: "{Name}"
					}
				}, {
					name: "Product ID",
					template: {
						content: "{ProductId}"
					}
				}, {
					name: "Supplier",
					template: {
						content: "{SupplierName}"
					}
				}, {
					name: "Dimensions",
					template: {
						content: {
							parts: ["Width", "Depth", "Height", "DimUnit"],
							formatter: function(width, depth, height, dimUnit) {
								return width + " x " + depth + " x " + height + " " + dimUnit;
							},
							state: "Warning"
						}
						// "{Width} x {Depth} x {Height} {DimUnit}"
					}
				}, {
					name: "Weight",
					template: {
						content: "{WeightMeasure} {WeightUnit}"
					}
				}, {
					name: "Price",
					template: {
						content: "{Price} {CurrencyCode}"
					}
				}]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				new sap.m.MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});

		},
		ddlUpgradeChanged: function() {
			// add filter for search
			var aFilters = [];
			// var sQuery = oEvt.getSource().getValue();
			// if (sQuery && sQuery.length > 0) {
			// var filter = new sap.ui.model.Filter("val", sap.ui.model.FilterOperator.Contains, sQuery);
			// aFilters.push(filter);
			// }
			// var filter = "";
			var upgrade = this.getView().byId("ddlUpgrade").getSelectedKey();
			var tempBrown = window.globalTempBrown;
			var tempGreen = window.globalTempGreen;

			if (upgrade == "GF") {
				for (var t = 0; t < tempGreen.length; t++) {
					for (var q = 0; q < tempGreen[t].cmpny.length; q++) {
						var filter = new sap.ui.model.Filter("val", sap.ui.model.FilterOperator.Contains, tempGreen[t].cmpny[q]);
						aFilters.push(filter);
					}
				}
			} else if (upgrade == "BF") {
				for (var t = 0; t < tempBrown.length; t++) {
					for (var q = 0; q < tempBrown[t].cmpny.length; q++) {
						var filter = new sap.ui.model.Filter("val", sap.ui.model.FilterOperator.Contains, tempBrown[t].cmpny[q]);
						aFilters.push(filter);
					}
				}
			} else {
				// var filter = "";
				// aFilters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("listTable");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");

		},
		UpdateGUIGraphsdate: function(oEvent) {
			var self = this;
			self.stat = true;
			self.state = false;
			var tempDateBtn = (oEvent.getParameters().id).split("--")[1];
			// var tempDateBtn = this.getView().byId("dateview").getSelectedButton().split("--")[1];
			if (tempDateBtn == "btn1Day") {
				
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 1) );
				// if(fromDate.getDate()!=1){
				// 	fromDate.setDate(1);
				// }
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Month") {
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setDate((fromDate.getDate() - 30) + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn3Month") {
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 3));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn6Month") {
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 6));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn1Year") {
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 12));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			} else if (tempDateBtn == "btn2Year") {
				var Datetoday = new Date();
				var toDate = new Date();
				toDate = toDate.YYYYMMDD();

				var fromDate = new Date();
				fromDate.setMonth((fromDate.getMonth() - 24));
				fromDate.setDate(fromDate.getDate() + 1);
				if(fromDate.getDate()!=1){
					fromDate.setDate(1);
				}
				var fromDateDay = fromDate.YYYYMMDD();

				var fromCompDate = fromDate.toISOString();
				var toCompDate = Datetoday.toISOString();
			}
			this.getView().byId("dateviewrange").setDateValue(stringToDate(fromDateDay));
			this.getView().byId("dateviewrange").setSecondDateValue(stringToDate(toDate));

			var mdl = this.getView().getModel();
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}

			this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
			// this.ddlSPChangedSuccess();
			this.getView().byId("searchfield").setValue("");
			
			this.showBusyIndicator(10000, 0);
			
			this.loadTileData(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadDDlUpgrade(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadSuccessChartSub(mdl, tempKey, fromCompDate, toCompDate, "");
			this.CallCustomerData(mdl, tempKey, fromCompDate, toCompDate, "");
			
			this.loadCustomerList(mdl, tempKey, fromCompDate, toCompDate, "");
			// this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);

		},

		UpdateDateRange: function(oEvent) {
			var self = this;
			self.stat = false;
			self.state = true;

			this.getView().byId("dateview").setSelectedButton("0");
			// var d = this.getView().byId("dateview").getSelectedButton();
			var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
			var fromDate = fromDateVal.YYYYMMDD();
			var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
			var toDate = toDateVal.YYYYMMDD();
			var tempDateToday = new Date();
			var tempDateToday = tempDateToday.YYYYMMDD();
			if (fromDate > tempDateToday) {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
			} else if (toDate > tempDateToday) {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
			} else {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
			}

			this.getView().byId("dateviewrange").setDateValue(stringToDate(fromDate));
			this.getView().byId("dateviewrange").setSecondDateValue(stringToDate(toDate));

			// var fromCompDate = fromDateVal.toISOString();
			// var toCompDate = toDateVal.toISOString();
			
			var fromCompDate = fromDateVal.toISOString();
			fromCompDate = fromCompDate.split("T")[0] + "T00:00";
			var toCompDateTemp = toDateVal.toISOString();
			var tempDateTo = (new Date(toCompDateTemp)).getDate();
			var d = new Date(toCompDateTemp);
			d.setDate(tempDateTo);
			var toCompDate = d.toISOString();
			toCompDate = toCompDate.split("T")[0] + "T24:00";

			var mdl = this.getView().getModel();
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}

			this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
			// this.ddlSPChangedSuccess();
			this.getView().byId("searchfield").setValue("");
			
			this.showBusyIndicator(10000, 0);
			
			this.loadTileData(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadDDlUpgrade(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadSuccessChartSub(mdl, tempKey, fromCompDate, toCompDate, "");
			this.CallCustomerData(mdl, tempKey, fromCompDate, toCompDate, "");
			
			this.loadCustomerList(mdl, tempKey, fromCompDate, toCompDate, "");
			// this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);

		},

		ddlDeployChanged:function(oEvent){
			var self = this;
			self.stat = false;
			self.state = true;

			this.getView().byId("dateview").setSelectedButton("0");
			// var d = this.getView().byId("dateview").getSelectedButton();
			var fromDateVal = this.getView().byId("dateviewrange").getDateValue();
			var fromDate = fromDateVal.YYYYMMDD();
			var toDateVal = this.getView().byId("dateviewrange").getSecondDateValue();
			var toDate = toDateVal.YYYYMMDD();
			var tempDateToday = new Date();
			var tempDateToday = tempDateToday.YYYYMMDD();
			if (fromDate > tempDateToday) {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
			} else if (toDate > tempDateToday) {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
			} else {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
			}

			this.getView().byId("dateviewrange").setDateValue(stringToDate(fromDate));
			this.getView().byId("dateviewrange").setSecondDateValue(stringToDate(toDate));

			// var fromCompDate = fromDateVal.toISOString();
			// var toCompDate = toDateVal.toISOString();
			
			var fromCompDate = fromDateVal.toISOString();
			fromCompDate = fromCompDate.split("T")[0] + "T00:00";
			var toCompDateTemp = toDateVal.toISOString();
			var tempDateTo = (new Date(toCompDateTemp)).getDate();
			var d = new Date(toCompDateTemp);
			d.setDate(tempDateTo);
			var toCompDate = d.toISOString();
			toCompDate = toCompDate.split("T")[0] + "T24:00";

			var mdl = this.getView().getModel();
			var tempKey = this.getView().byId("ddlVersion").getSelectedKey();
			if (tempKey == "Version") {
				tempKey = "";
			}
			
			
			var oModelUpgradeRefData = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefData.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefData, "oModelUpgradeRefData");
			
			
			var oModelUpgradeRefDataUpgrade = new sap.ui.model.json.JSONModel();
			oModelUpgradeRefDataUpgrade.setSizeLimit(50000);
			sap.ui.getCore().setModel(oModelUpgradeRefDataUpgrade, "oModelUpgradeRefDataUpgrade");

			this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
			
			this.showBusyIndicator(10000, 0);
			
			// this.ddlSPChangedSuccess();
			this.getView().byId("searchfield").setValue("");
			this.loadTileData(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadDDlUpgrade(mdl, tempKey, fromCompDate, toCompDate, "");
			this.loadSuccessChartSub(mdl, tempKey, fromCompDate, toCompDate, "");
			this.CallCustomerData(mdl, tempKey, fromCompDate, toCompDate, "");
			
			this.loadCustomerList(mdl, tempKey, fromCompDate, toCompDate, "");
			// this.loadChartBottom(mdl, tempKey, fromCompDate,toCompDate);
			
			
		
		},


		loadDDlVersion: function(mdl) {

			var me = this;
			var url =
				"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY,TIME_STAMP,FILEVERSION&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering'";

			// mdl.read(
			// 	url,
			// 	null, null, true,
			// 	function(oData, oResponse) {
			// 		if (oData.results.length > 0) {

			// 			var oModelVersion = new sap.ui.model.json.JSONModel();
			// 			oModelVersion.setSizeLimit(1000);
			// 			sap.ui.getCore().setModel(oModelVersion, "oModelVersion");

			// 			var tempData = [];
			// 			for (var q = 0; q < oData.results.length; q++) {
			// 				// if(oData.results[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
			// 				// 	oData.results[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
			// 				// }
			// 				// if(oData.results[q].COMPANY=="Release"){
			// 				// 	oData.results[q].COMPANY="Stericycle Inc (de)";
			// 				// }
							
			// 				// var majorBlk = oData.results[q].UPGRADE_ELEMENT.split("_");
			// 				// var lastItem = majorBlk[majorBlk.length-1];
			// 				// if(lastItem.length!=32){
			// 					if(oData.results[q].COMPANY!="BPMCINSTANCE4" && oData.results[q].COMPANY!="BPMCINSTANCE1"){
			// 					if (oData.results[q].COMPANYSCHEMA != null && oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
			// 					// if (oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf(
			// 					// 		"stg") > -1 || oData.results[q].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
			// 						// if (oData.results[q].COMPANY.toLowerCase().indexOf("test") === -1 && oData.results[q].COMPANY.toLowerCase().indexOf("demo") ===	-1) {
			// 						if (oData.results[q].FILEVERSION != "") {
			// 							if (oData.results[q].FILEVERSION != null) {
			// 								tempData.push({
			// 									version: oData.results[q].FILEVERSION.split("b")[1].split("/")[0],
			// 									versionPara: oData.results[q].FILEVERSION
			// 								});
			// 							}
			// 						}
			// 					// }
			// 				}
			// 				}
			// 				// }
			// 			}

			// 			var uniqueVersion = tempData.reduce(function(item, e1) {
			// 				var matches = item.filter(function(e2) {
			// 					return e1.version == e2.version;
			// 				});
			// 				if (matches.length == 0) {
			// 					item.push(e1);
			// 				}
			// 				return item;
			// 			}, []);
						
			// 			uniqueVersion.sort(function(a, b) {
			// 				return (a.version > b.version) ? 1 : ((b.version > a.version) ? -1 : 0);
			// 			});
			// 			uniqueVersion = uniqueVersion.reverse();

			// 			uniqueVersion.unshift({
			// 				version: "Build Version",
			// 				versionPara: "Version"
			// 			});

			// 			var oDataGrp = {
			// 				"stlist": uniqueVersion
			// 			};

			// 			oModelVersion.setData(oDataGrp);
			// 			me.getView().byId("ddlVersion").setModel(oModelVersion);

			// 		}else{
			// 			var oDataGrp = {
			// 				"stlist": []
			// 			};

			// 			oModelVersion.setData(oDataGrp);
			// 			me.getView().byId("ddlVersion").setModel(oModelVersion);
			// 		}
			// 	},
			// 	function(oError) {
			// 		console.log("Error 127");
			// 	});
var oModelVersion = new sap.ui.model.json.JSONModel();
						oModelVersion.setSizeLimit(1000);
						sap.ui.getCore().setModel(oModelVersion, "oModelVersion");
						var uniqueVersion = [{
							version: "Build Version",
							versionPara: "Version"
						},{
							version: "2111",
							versionPara: "b2111/"
						},{
							version: "2105",
							versionPara: "b2105/"
						},{
							version: "2011",
							versionPara: "b2011/"
						},{
							version: "2005",
							versionPara: "b2005/"
						},{
							version: "1911",
							versionPara: "b1911"
						},{
							version: "1908",
							versionPara: "b1908/"
						},{
							version: "1905",
							versionPara: "b1905/"
						},{
							version: "1902",
							versionPara: "b1902/"
						},{
							version: "1811",
							versionPara: "b1811/"
						},{
							version: "1808",
							versionPara: "b1808/"
						},{
							version: "1805",
							versionPara: "b1805/"
						},{
							version: "1802",
							versionPara: "b1802/"
						},{
							version: "1711",
							versionPara: "b1711/"
						},{
							version: "1708",
							versionPara: "b1708/"
						},{
							version: "1705",
							versionPara: "b1705/"
						}];
						

						var oDataGrp = {
							"stlist": uniqueVersion
						};

						oModelVersion.setData(oDataGrp);
						me.getView().byId("ddlVersion").setModel(oModelVersion);
		},
		
		hideBusyIndicator: function () {
			sap.ui.core.BusyIndicator.hide();
		},

		showBusyIndicator: function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);

			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}

				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
					this.hideBusyIndicator();
				});
			}
		},
		
		
		loadDDlUpgrade: function(mdl, para, fromCompDate, toCompDate, fillBP) {
			var tempBP = [];
			var tempBPPreChk = [];
			var tempdataSP = [];
			var me = this;
			var oModelColumnChartSVAccDetail = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelColumnChartSVAccDetail, "oModelColumnChartSVAccDetail");
			
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
			

			var oModelGroups = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelGroups, "oModelGroups");
			tempdataSP.push({
				BP: "All Upgrade Elements",
				BPKEY: "All"
			});
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();

			// if (para != "") {
			// 	var url =
			// 		"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
			// 		para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			// } else {
			// 	var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
			// }

			if (fillBP == "") {
				if (para != "") {
					
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				} else {
					
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				}
			} else {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
					var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				}
			}

			mdl.read(url,
				null, null, true,
				function(oData, oResponse) {
					if (oData.results.length > 0) {
						
						for (var w = 0; w < oData.results.length; w++) {
							// if(oData.results[w].COMPANY=="CRUZ ROJA ESPAÑOLA"){
							// 	oData.results[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
							// }
							// if(oData.results[w].COMPANY=="Release"){
							// 	oData.results[w].COMPANY="Stericycle Inc (de)";
							// }
							
							var majorBlk = oData.results[w].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								if(oData.results[w].COMPANY!="BPMCINSTANCE4" && oData.results[w].COMPANY!="BPMCINSTANCE1"){
								if (oData.results[w].COMPANYSCHEMA != null && oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
								// if (oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf(
								// 		"stg") > -1 || oData.results[w].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
									tempBPPreChk.push(oData.results[w].UPGRADE_ELEMENT);
								// }
							}
							}
							}
						}
						
						if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							for(var a1=0;a1<tempBPPreChk.length;a1++){
								tempBP.push(tempBPPreChk[a1]);
							}
						} else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
							for(var a1=0;a1<tempBPPreChk.length;a1++){
								for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
									if(tempBPPreChk[a1]==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
										tempBP.push(tempBPPreChk[a1]);
										break;
									}
										// break;
								}
							}
						} else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
							for(var a1=0;a1<tempBPPreChk.length;a1++){
								for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
									if(tempBPPreChk[a1]!=datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
										tempBP.push(tempBPPreChk[a1]);
										break;
									}
										// break;
								}
							}
						} else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
							for(var a1=0;a1<tempBPPreChk.length;a1++){
								for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
									if(tempBPPreChk[a1]!=datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
										tempBP.push(tempBPPreChk[a1]);
										break;
									}
										// break;
								}
							}
						} else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
							for(var a1=0;a1<tempBPPreChk.length;a1++){
								for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
									if(tempBPPreChk[a1]!=datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
										tempBP.push(tempBPPreChk[a1]);
										break;
									}
										// break;
								}
							}
						} else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
							for(var a1=0;a1<tempBPPreChk.length;a1++){
								for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
									if(tempBPPreChk[a1]!=datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
										tempBP.push(tempBPPreChk[a1]);
										break;
									}
										// break;
								}
							}
						} else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
							for(var a1=0;a1<tempBPPreChk.length;a1++){
								for(var a2=0;a2<datatempoModelUpgradeRecruitEC.length;a2++){
									if(tempBPPreChk[a1]!=datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
										tempBP.push(tempBPPreChk[a1]);
										break;
									}
										// break;
								}
							}
						}
						
						
						var uniqueBP = tempBP.filter(function(itm, i, tempBP) {
							return i == tempBP.indexOf(itm);
						});

						for (var z = 0; z < uniqueBP.length; z++) {
							if (uniqueBP[z].split("Best Practice Configurations Employee Central")[1] == undefined) {
								if (uniqueBP[z].split("bestpracticesEmployeeCentral")[1] == undefined) {
									// tempdataSP.push({
									// 	BP: "EC"+uniqueBP[z].split("Best Practices Employee Central")[1],
									// 	BPKEY: uniqueBP[z]
									// });
									if (uniqueBP[z].split("Best Practices Employee Central")[1] == undefined) {
										if (uniqueBP[z].split("Best Practices")[1] == undefined) {
											
											if(uniqueBP[z].split("Best Practice")[1]==undefined){
												tempdataSP.push({
													BP: uniqueBP[z],
													BPKEY: uniqueBP[z]
												});
											}else{
												tempdataSP.push({
													BP: uniqueBP[z].split("Best Practice")[1],
													BPKEY: uniqueBP[z]
												});
											}
											
											
										} else { 
											if(uniqueBP[z].indexOf("In-app learning")>-1){
											tempdataSP.push({
												BP: uniqueBP[z],
												BPKEY: uniqueBP[z]
											});	
											}else{
												tempdataSP.push({
												BP: uniqueBP[z].split("Best Practices")[1],
												BPKEY: uniqueBP[z]
											});
											}
											
										}
									} else {
										tempdataSP.push({
											BP: "EC" + uniqueBP[z].split("Best Practices Employee Central")[1],
											BPKEY: uniqueBP[z]
										});
									}

								} else {
									tempdataSP.push({
										BP: "EC" + uniqueBP[z].split("bestpracticesEmployeeCentral")[1],
										BPKEY: uniqueBP[z]
									});
								}
							} else {
								tempdataSP.push({
									BP: "EC" + uniqueBP[z].split("Best Practice Configurations Employee Central")[1],
									BPKEY: uniqueBP[z]
								});
							}

							var oModelGroups = sap.ui.getCore().getModel("oModelGroups");
							oModelGroups.setProperty('/splist', tempdataSP);

						}

						var oDataGrp = {
							"splist": tempdataSP
						};
						var oModelGroups = sap.ui.getCore().getModel("oModelGroups");
						oModelGroups.setData(oDataGrp);
						me.getView().byId("ddlSPSuccess").setModel(oModelGroups);
						me.getView().byId("ddlSPSuccess").setSelectedKeys("All");

					}else{
						var oDataGrp = {
							"splist": []
						};
						var oModelGroups = sap.ui.getCore().getModel("oModelGroups");
						oModelGroups.setData(oDataGrp);
					}
				},
				function(oError) {
					console.log("Error 127");
				});

		},
		loadCustomerList: function(mdl, para, fromCompDate, toCompDate, fillBP) {
			
			
			var me = this;
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
			if (fillBP == "") {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				}
			} else {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				}
			}

			mdl.read(
				url,
				null, null, true,
				function(oData, oResponse) {
					if (oData.results.length > 0) {

						var oModelVersion = new sap.ui.model.json.JSONModel();
						oModelVersion.setSizeLimit(1000);
						sap.ui.getCore().setModel(oModelVersion, "oModelVersion");

						var oModelCustomer = new sap.ui.model.json.JSONModel();
						oModelCustomer.setSizeLimit(1000);
						sap.ui.getCore().setModel(oModelCustomer, "oModelCustomer");
						
						// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
						
							var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
						var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
						var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
						var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
						var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
						var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
			

						var tempODATA = [];
						var tempODATAPreCheck = [];
						var tempODATAPreCheckFilter = [];
						var tempdataRg = [];
						var tempTimeData = [];
						var custName = [];
						var custUsers = [];

						tempdataRg.push({
							version: "Build Version",
							versionPara: "Version"
						});
						var tempData = [];
						var count = 0;
						tempODATAPreCheck = oData.results;
						
						
						for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
							var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
							
							// if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							// 	tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Recruiting"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;	
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
							// 	for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 			break;
							// 		}
									
							// 	}
							// }
							
							
							
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
								
								
								
								
								
								
								
							}
						}
						for (var q = 0; q < tempODATAPreCheckFilter.length; q++) {
							// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
							// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
							// }
							// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
							// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
							// }
							if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
								if (tempODATAPreCheckFilter[q].COMPANYSCHEMA != null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
								// if (tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf(
								// 		"stg") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 ) {
									
									// tempODATAPreCheck = oData.results;
									// tempODATA.push(oData.results[q].COMPANY);
									
									tempODATA.push(tempODATAPreCheckFilter[q].COMPANY);

									if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1] == undefined) {
										if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1] == undefined) {
											// tempTimeData.push({
											// 	company: tempODATAPreCheckFilter[q].COMPANY,
											// 	upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
											// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toDateString(),
											// 	result: tempODATAPreCheckFilter[q].RESULT
											// });
											if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1] == undefined) {
												if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1] == undefined) {
													if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1] == undefined){
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}else{
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1],
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}
													
												} else {
													if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.indexOf("In-app learning")>-1){
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}else{
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1],
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}
														
												}
											} else {
												tempTimeData.push({
													company: tempODATAPreCheckFilter[q].COMPANY,
													upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
													timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
													result: tempODATAPreCheckFilter[q].RESULT
												});
											}
										} else {
											tempTimeData.push({
												company: tempODATAPreCheckFilter[q].COMPANY,
												upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
												timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
												result: tempODATAPreCheckFilter[q].RESULT
											});
										}
									} else {
										tempTimeData.push({
											company: tempODATAPreCheckFilter[q].COMPANY,
											upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
											timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
											result: tempODATAPreCheckFilter[q].RESULT
										});

									}

								// }
							}
							}
						}
						

						var unique = tempODATA.filter(function(itm, i, tempODATA) {
							return i == tempODATA.indexOf(itm);
						});

						var tempTimeAry = [];

						for (var w = 0; w < unique.length; w++) {
							for (var z = 0; z < tempTimeData.length; z++) {
								if (unique[w] == tempTimeData[z].company) {
									tempTimeAry.push({
										val: unique[w],
										valTime:"",
										upgrade: [],
										upgradeDisplay: [],
										upgradeString: "",
										time: (tempTimeData[z].timestamp).split(' ', 4).join(' '),
										result: []
									});
									break;
								}
							}
						}

						for (var w = 0; w < tempTimeAry.length; w++) {
							for (var z = 0; z < tempTimeData.length; z++) {
								if (tempTimeAry[w].val == tempTimeData[z].company) {
									tempTimeAry[w].valTime = tempTimeAry[w].val+ " - " + tempTimeData[z].timestamp;
									tempTimeAry[w].result.push(tempTimeData[z].result);
									tempTimeAry[w].upgrade.push(tempTimeData[z].upgrade);
									tempTimeAry[w].upgradeDisplay.push(tempTimeData[z].upgrade + " - " + tempTimeData[z].timestamp);
								}
							}
						}
						var uniqueData = [];

						for (var w = 0; w < tempTimeAry.length; w++) {
							if (tempTimeAry[w].result.indexOf("true") > -1) {

							} else {
								uniqueData.push({
									Name: tempTimeAry[w].val,
									Time: tempTimeAry[w].time,
								});
							}
						}
						
						me.callRef(mdl, para, fillBP, uniqueData);

						// var oModel = new sap.ui.model.json.JSONModel();
						// oModel.setData(uniqueData);
						// me.getView().byId("listTableList").setModel(oModel);
						
						// setTimeout(function() { 
						// 	var tempHeight = $(".heightHBox").height();
						// 	me.getView().byId("tableSc").setHeight(tempHeight-204+"px");
						// 	me.getView().byId("vboxTable").setHeight(tempHeight+100+"px");
						// }, 1000);
						
					}else{
						// me.callRef(mdl, para, fillBP, "");
					}
				},
				function(oError) {
					console.log("Error 127");
				});

		},
		callRef: function(mdl, para, fillBP, uniqueDataRef) {
			var tempODATAPreCheck = [];
			var tempODATAPreCheckFilter = [];
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
						var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
						var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
						var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
						var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
						var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
						
			
			var Datetoday = new Date();
			var fromDate = new Date();
			fromDate.setMonth((fromDate.getMonth() - 60));
			fromDate.setDate(fromDate.getDate() + 1);

			if (fromDate.getDate() != 1) {
				fromDate.setDate(1);
			}

			var fromCompDateAll = fromDate.toISOString();
			var toCompDateTemp = Datetoday.toISOString();

			fromCompDateAll = fromCompDateAll.split("T")[0] + "T00:00";
			toCompDateTemp = toCompDateTemp.split("T")[0] + "T24:00";
			var tempDateTo = (new Date(toCompDateTemp)).getDate();
			var d = new Date(toCompDateTemp);
			d.setDate(tempDateTo);
			var toCompDateAll = d.toISOString();
			toCompDateAll = toCompDateAll.split("T")[0] + "T24:00";
			
			

			var me = this;
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
			
			
			
			var oModelUpgradeRefDataData = sap.ui.getCore().getModel("oModelUpgradeRefData").getData();
			
			if(oModelUpgradeRefDataData.length>0){
				
				tempODATAPreCheck = oModelUpgradeRefDataData;
					
				
					for (var q = 0; q < tempODATAPreCheck.length; q++) {
						
						
						var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
						
							// if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							// 	tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Recruiting"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;	
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
							// 	for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 			break;
							// 		}
									
							// 	}
							// }
							
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							}
						}
						
						
					
									
					if (tempODATAPreCheckFilter.length > 0) {

						var tempODATA = [];
						var tempTimeData = [];

						for (var q = 0; q < tempODATAPreCheckFilter.length; q++) {
							// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
							// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
							// }
							// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
							// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
							// }
							if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
								if (tempODATAPreCheckFilter[q].COMPANYSCHEMA != null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
								// if (tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1  || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf(
								// 		"stg") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1) {
									tempODATA.push(tempODATAPreCheckFilter[q].COMPANY);

									if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1] == undefined) {
										if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1] == undefined) {
											if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1] == undefined) {
												if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1] == undefined) {
													if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1] == undefined){
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}else{
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1],
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}
													
												} else {
													if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.indexOf("In-app learning")>-1){
														tempTimeData.push({
														company: tempODATAPreCheckFilter[q].COMPANY,
														upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
														timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														result: tempODATAPreCheckFilter[q].RESULT
													});
													}else{
														tempTimeData.push({
														company: tempODATAPreCheckFilter[q].COMPANY,
														upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1],
														timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														result: tempODATAPreCheckFilter[q].RESULT
													});
													}
													
												}
											} else {
												tempTimeData.push({
													company: tempODATAPreCheckFilter[q].COMPANY,
													upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
													timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
													result: tempODATAPreCheckFilter[q].RESULT
												});
											}
										} else {
											tempTimeData.push({
												company: tempODATAPreCheckFilter[q].COMPANY,
												upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
												timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
												result: tempODATAPreCheckFilter[q].RESULT
											});
										}
									} else {
										tempTimeData.push({
											company: tempODATAPreCheckFilter[q].COMPANY,
											upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
											timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
											result: tempODATAPreCheckFilter[q].RESULT
										});

									}

								// }
							}
							}
						}

						var unique = tempODATA.filter(function(itm, i, tempODATA) {
							return i == tempODATA.indexOf(itm);
						});

						var tempTimeAry = [];

						for (var w = 0; w < unique.length; w++) {
							for (var z = 0; z < tempTimeData.length; z++) {
								if (unique[w] == tempTimeData[z].company) {
									tempTimeAry.push({
										val: unique[w],
										valTime:"",
										upgrade: [],
										upgradeDisplay: [],
										upgradeString: "",
										time: (tempTimeData[z].timestamp).split(' ', 4).join(' '),
										result: []
									});
									break;
								}
							}
						}

						for (var w = 0; w < tempTimeAry.length; w++) {
							for (var z = 0; z < tempTimeData.length; z++) {
								if (tempTimeAry[w].val == tempTimeData[z].company) {
									tempTimeAry[w].valTime = tempTimeAry[w].val+ " - " + tempTimeData[z].timestamp;
									tempTimeAry[w].result.push(tempTimeData[z].result);
									tempTimeAry[w].upgrade.push(tempTimeData[z].upgrade);
									tempTimeAry[w].upgradeDisplay.push(tempTimeData[z].upgrade + " - " + tempTimeData[z].timestamp);
								}
							}
						}
						var uniqueData = [];

						for (var w = 0; w < tempTimeAry.length; w++) {
							if (tempTimeAry[w].result.indexOf("true") > -1) {

							} else {
								uniqueData.push({
									Name: tempTimeAry[w].val,
									Time: tempTimeAry[w].time,
								});
							}
						}
						
						var inputFedAry = [];
						for(var q=0;q<uniqueData.length;q++){
							for(var q1=0;q1<uniqueDataRef.length;q1++){
								if(uniqueData[q].Name==uniqueDataRef[q1].Name){
									inputFedAry.push({
										Name: uniqueData[q].Name,
										Time: uniqueData[q].Time
									});
								}
							}
						}
						

						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(inputFedAry);
						me.getView().byId("listTableList").setModel(oModel);
						
						setTimeout(function() { 
							var tempHeight = $(".heightHBox > div:nth-child(1)").height();
							if(tempHeight<300){
								me.getView().byId("tableSc").setHeight(204+"px");
								me.getView().byId("vboxTable").setHeight(500+"px");
							}else{
								me.getView().byId("tableSc").setHeight(tempHeight-204+"px");
								me.getView().byId("vboxTable").setHeight(tempHeight+100+"px");
							}
							
						
						}, 1000);
						
					}
				
				
			}else{
				
			

			if (fillBP == "") {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT)  and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "'";
				}
			} else {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY,RESULT,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDateAll + "' and TIME_STAMP le datetime'" + toCompDateAll + "' and " + fillBP;
				}
			}
			

			mdl.read(
				url,
				null, null, true,
				function(oData, oResponse) {
					tempODATAPreCheck = oData.results;
					
					var datatemp = oData.results;
					
					sap.ui.getCore().getModel("oModelUpgradeRefData").setData(datatemp);
					
					for (var q = 0; q < tempODATAPreCheck.length; q++) {
						
						
						var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
						
							// if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							// 	tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Recruiting"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;	
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
							// 	for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 			break;
							// 		}
									
							// 	}
							// }
							
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							
							}
						}
						
						
					
									
					if (tempODATAPreCheckFilter.length > 0) {

						var tempODATA = [];
						var tempTimeData = [];

						for (var q = 0; q < tempODATAPreCheckFilter.length; q++) {
							// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
							// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
							// }
							// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
							// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
							// }
							if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
								if (tempODATAPreCheckFilter[q].COMPANYSCHEMA != null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
								// if (tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1  || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf(
								// 		"stg") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1) {
									tempODATA.push(tempODATAPreCheckFilter[q].COMPANY);

									if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1] == undefined) {
										if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1] == undefined) {
											if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1] == undefined) {
												if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1] == undefined) {
													if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1] == undefined){
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}else{
														tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1],
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															result: tempODATAPreCheckFilter[q].RESULT
														});
													}
													
												} else {
													if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.indexOf("In-app learning")>-1){
														tempTimeData.push({
														company: tempODATAPreCheckFilter[q].COMPANY,
														upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
														timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														result: tempODATAPreCheckFilter[q].RESULT
													});
													}else{
														tempTimeData.push({
														company: tempODATAPreCheckFilter[q].COMPANY,
														upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1],
														timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														result: tempODATAPreCheckFilter[q].RESULT
													});
													}
													
												}
											} else {
												tempTimeData.push({
													company: tempODATAPreCheckFilter[q].COMPANY,
													upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
													timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
													result: tempODATAPreCheckFilter[q].RESULT
												});
											}
										} else {
											tempTimeData.push({
												company: tempODATAPreCheckFilter[q].COMPANY,
												upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
												timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
												result: tempODATAPreCheckFilter[q].RESULT
											});
										}
									} else {
										tempTimeData.push({
											company: tempODATAPreCheckFilter[q].COMPANY,
											upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
											timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
											result: tempODATAPreCheckFilter[q].RESULT
										});

									}

								// }
							}
							}
						}

						var unique = tempODATA.filter(function(itm, i, tempODATA) {
							return i == tempODATA.indexOf(itm);
						});

						var tempTimeAry = [];

						for (var w = 0; w < unique.length; w++) {
							for (var z = 0; z < tempTimeData.length; z++) {
								if (unique[w] == tempTimeData[z].company) {
									tempTimeAry.push({
										val: unique[w],
										valTime:"",
										upgrade: [],
										upgradeDisplay: [],
										upgradeString: "",
										time: (tempTimeData[z].timestamp).split(' ', 4).join(' '),
										result: []
									});
									break;
								}
							}
						}

						for (var w = 0; w < tempTimeAry.length; w++) {
							for (var z = 0; z < tempTimeData.length; z++) {
								if (tempTimeAry[w].val == tempTimeData[z].company) {
									tempTimeAry[w].valTime = tempTimeAry[w].val+ " - " + tempTimeData[z].timestamp;
									tempTimeAry[w].result.push(tempTimeData[z].result);
									tempTimeAry[w].upgrade.push(tempTimeData[z].upgrade);
									tempTimeAry[w].upgradeDisplay.push(tempTimeData[z].upgrade + " - " + tempTimeData[z].timestamp);
								}
							}
						}
						var uniqueData = [];

						for (var w = 0; w < tempTimeAry.length; w++) {
							if (tempTimeAry[w].result.indexOf("true") > -1) {

							} else {
								uniqueData.push({
									Name: tempTimeAry[w].val,
									Time: tempTimeAry[w].time,
								});
							}
						}
						
						var inputFedAry = [];
						for(var q=0;q<uniqueData.length;q++){
							for(var q1=0;q1<uniqueDataRef.length;q1++){
								if(uniqueData[q].Name==uniqueDataRef[q1].Name){
									inputFedAry.push({
										Name: uniqueData[q].Name,
										Time: uniqueData[q].Time
									});
								}
							}
						}
						

						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(inputFedAry);
						me.getView().byId("listTableList").setModel(oModel);
						
						setTimeout(function() { 
							var tempHeight = $(".heightHBox > div:nth-child(1)").height();
							if(tempHeight<300){
								me.getView().byId("tableSc").setHeight(204+"px");
								me.getView().byId("vboxTable").setHeight(500+"px");
							}else{
								me.getView().byId("tableSc").setHeight(tempHeight-204+"px");
								me.getView().byId("vboxTable").setHeight(tempHeight+100+"px");
							}
							
						
						}, 1000);
						
					}
				
				},
				function(oError) {
					console.log("Error 127");
				});
			}

		},
		loadTileData: function(mdl, para, fromCompDate, toCompDate, fillBP) {

			var me = this;
			var tempODATAPreCheck = [];
			var tempODATAPreCheckFilter = [];
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
						var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
						var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
						var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
						var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
						var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
						
						
						
			var oModelBarScope = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModelBarScope, "oModelBarScope");
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
			
			if (fillBP == "") {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				}
			} else {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				}
			}

			mdl.read(
				url,
				null, null, true,
				function(oData, oResponse) {
					if(oData.results.length>0){
						tempODATAPreCheck = oData.results;
						
						for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
							
							var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								
							// if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							// 	tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Recruiting"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;	
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
							// 	for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 			break;
							// 		}
									
							// 	}
							// }
							
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							
							}
						}
						
						if (tempODATAPreCheckFilter.length > 0) {
	
	
							var tempODATA = [];
							var tempTimeData = [];
							var tempDateResultTrue = [];
							var tempDateResultFinal = [];
							var tempDateResultFinalBar = [];
	
							for (var q = 0; q < tempODATAPreCheckFilter.length; q++) {
								// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
								// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
								// }
								// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
								// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
								// }
								if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
									if (tempODATAPreCheckFilter[q].COMPANYSCHEMA != null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
									// if (tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf(
									// 		"stg") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1) {
	
										if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1] == undefined) {
											if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1] == undefined) {
												if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1] == undefined) {
													if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1] == undefined) {
														if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1] == undefined){
															tempTimeData.push({
																result: tempODATAPreCheckFilter[q].RESULT,
																cmpny: tempODATAPreCheckFilter[q].COMPANY,
																upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT
															});
															tempODATA.push(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT);
														}else{
															tempTimeData.push({
																result: tempODATAPreCheckFilter[q].RESULT,
																cmpny: tempODATAPreCheckFilter[q].COMPANY,
																upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1]
															});
															tempODATA.push(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1]);
														}
														
													} else {
														if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.indexOf("In-app learning")>-1){
															tempTimeData.push({
															result: tempODATAPreCheckFilter[q].RESULT,
															cmpny: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT
														});
														tempODATA.push(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT);
														}else{
															tempTimeData.push({
															result: tempODATAPreCheckFilter[q].RESULT,
															cmpny: tempODATAPreCheckFilter[q].COMPANY,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1]
														});
														tempODATA.push(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1]);
														}
														
													}
												} else {
													tempTimeData.push({
														result: tempODATAPreCheckFilter[q].RESULT,
														cmpny: tempODATAPreCheckFilter[q].COMPANY,
														upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1]
													});
													tempODATA.push("EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1]);
												}
											} else {
												tempTimeData.push({
													result: tempODATAPreCheckFilter[q].RESULT,
													cmpny: tempODATAPreCheckFilter[q].COMPANY,
													upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1]
												});
												tempODATA.push("EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1]);
											}
										} else {
											tempTimeData.push({
												result: tempODATAPreCheckFilter[q].RESULT,
												cmpny: tempODATAPreCheckFilter[q].COMPANY,
												upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1]
											});
											tempODATA.push("EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1]);
										}
									// }
								}
								}
							}
	
							var unique = tempODATA.filter(function(itm, i, tempODATA) {
								return i == tempODATA.indexOf(itm);
							});
	
							for (var q = 0; q < unique.length; q++) {
								var countTrue = 0;
								var countFalse = 0;
								for (var z = 0; z < tempTimeData.length; z++) {
									if (unique[q] == tempTimeData[z].upgrade) {
										if (tempTimeData[z].result == "true") {
											countTrue++;
										} else if (tempTimeData[z].result == "false") {
											countFalse++;
										}
	
										tempDateResultTrue.push({
											upgradeItem: tempTimeData[z].upgrade,
											cmpny: tempTimeData[z].cmpny,
											countTrue: countTrue,
											countFalse: countFalse
										});
	
									}
								}
							}
	
							tempDateResultTrue = tempDateResultTrue.reverse();
	
							for (var q = 0; q < unique.length; q++) {
								for (var z = 0; z < tempDateResultTrue.length; z++) {
									if (unique[q] == tempDateResultTrue[z].upgradeItem) {
										tempDateResultFinal.push({
											upgradeItem: tempDateResultTrue[z].upgradeItem,
											cmpny: [],
											cmpnyLength: 0,
											countTrue: tempDateResultTrue[z].countTrue,
											countFalse: tempDateResultTrue[z].countFalse,
											countTotal: (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse),
											percentTrue: parseFloat(((tempDateResultTrue[z].countTrue / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1)),
											percentFalse: parseFloat(((tempDateResultTrue[z].countFalse / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1)),
											formatTrue: ((tempDateResultTrue[z].countTrue / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1) + "%",
											formatFalse: ((tempDateResultTrue[z].countFalse / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1) + "%"
										});
										tempDateResultFinalBar.push({
											upgradeItem: tempDateResultTrue[z].upgradeItem,
											cmpny: [],
											cmpnyLength: 0,
											countTrue: tempDateResultTrue[z].countTrue,
											countFalse: tempDateResultTrue[z].countFalse,
											countTotal: (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse),
											percentTrue: parseFloat(((tempDateResultTrue[z].countTrue / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1)),
											percentFalse: parseFloat(((tempDateResultTrue[z].countFalse / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1)),
											formatTrue: ((tempDateResultTrue[z].countTrue / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1) + "%",
											formatFalse: ((tempDateResultTrue[z].countFalse / (tempDateResultTrue[z].countTrue + tempDateResultTrue[z].countFalse)) *
												100).toFixed(1) + "%"
										});
										break;
									}
								}
							}
	
							for (var q = 0; q < tempDateResultFinal.length; q++) {
								for (var z = 0; z < tempDateResultTrue.length; z++) {
									if (tempDateResultFinal[q].upgradeItem == tempDateResultTrue[z].upgradeItem) {
										if (tempDateResultFinal[q].cmpny.indexOf(tempDateResultTrue[z].cmpny) == -1) {
											tempDateResultFinal[q].cmpny.push(tempDateResultTrue[z].cmpny);
										}
									}
								}
							}
	
							for (var z = 0; z < tempDateResultFinal.length; z++) {
								tempDateResultFinal[z].cmpnyLength = tempDateResultFinal[z].cmpny.length;
							}
							
							for (var q = 0; q < tempDateResultFinalBar.length; q++) {
								for (var z = 0; z < tempDateResultTrue.length; z++) {
									if (tempDateResultFinalBar[q].upgradeItem == tempDateResultTrue[z].upgradeItem) {
										if (tempDateResultFinalBar[q].cmpny.indexOf(tempDateResultTrue[z].cmpny) == -1) {
											tempDateResultFinalBar[q].cmpny.push(tempDateResultTrue[z].cmpny);
										}
									}
								}
							}
	
							for (var z = 0; z < tempDateResultFinalBar.length; z++) {
								tempDateResultFinalBar[z].cmpnyLength = tempDateResultFinalBar[z].cmpny.length;
							}
							
	
							// for(var q=0;q<tempDateResultFinal.length;q++){
							// 	var tempODATA = tempDateResultFinal[q].cmpny;
							// 	var unique = tempODATA.filter(function(itm, i, tempODATA) {
							// 		return i == tempODATA.indexOf(itm);
							// 	});
							// }
							tempDateResultFinal.sort(function(a, b) {
								return (a.cmpnyLength > b.cmpnyLength) ? 1 : ((b.cmpnyLength > a.cmpnyLength) ? -1 : 0);
							});
							tempDateResultFinalBar.sort(function(a, b) {
								return (a.cmpnyLength > b.cmpnyLength) ? 1 : ((b.cmpnyLength > a.cmpnyLength) ? -1 : 0);
							});
							
							tempDateResultFinalBar = tempDateResultFinalBar.reverse();
							
							var tempBPCountArrayFilter = [];
							
							// if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
							// 	for(var t1=0;t1<tempDateResultFinal.length;t1++){
							// 		if(tempDateResultFinal[t1].upgradeItem.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
							// 			tempBPCountArrayFilter.push(tempDateResultFinal[t1]);
							// 		}
							// 	}
							// }else{
								tempBPCountArrayFilter = tempDateResultFinal;
							// }
							
							
							if (tempBPCountArrayFilter.length > 2) {
								me.getView().byId("trendVBox2Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox2Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox2Text4").setText(tempBPCountArrayFilter[2].upgradeItem);
							} else if (tempBPCountArrayFilter.length == 2) {
								me.getView().byId("trendVBox2Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox2Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox2Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 1) {
								me.getView().byId("trendVBox2Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox2Text3").setText("");
								me.getView().byId("trendVBox2Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 0) {
								me.getView().byId("trendVBox2Text2").setText("");
								me.getView().byId("trendVBox2Text3").setText("");
								me.getView().byId("trendVBox2Text4").setText("");
							}
	
							tempBPCountArrayFilter.reverse();
	
							if (tempBPCountArrayFilter.length > 2) {
								me.getView().byId("trendVBox1Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox1Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox1Text4").setText(tempBPCountArrayFilter[2].upgradeItem);
							} else if (tempBPCountArrayFilter.length == 2) {
								me.getView().byId("trendVBox1Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox1Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox1Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 1) {
								me.getView().byId("trendVBox1Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox1Text3").setText("");
								me.getView().byId("trendVBox1Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 0) {
								me.getView().byId("trendVBox1Text2").setText("");
								me.getView().byId("trendVBox1Text3").setText("");
								me.getView().byId("trendVBox1Text4").setText("");
							}
	
	
							me.getView().getModel("testModelTile").setData(tempBPCountArrayFilter);
							tempBPCountArrayFilter.sort(function(a, b) {
								return (a.formatTrue > b.formatTrue) ? 1 : ((b.formatTrue > a.formatTrue) ? -1 : 0);
							});
							
							if (tempBPCountArrayFilter.length > 2) {
								me.getView().byId("trendVBox4Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox4Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox4Text4").setText(tempBPCountArrayFilter[2].upgradeItem);
							} else if (tempBPCountArrayFilter.length == 2) {
								me.getView().byId("trendVBox4Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox4Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox4Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 1) {
								me.getView().byId("trendVBox4Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox4Text3").setText("");
								me.getView().byId("trendVBox4Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 0) {
								me.getView().byId("trendVBox4Text2").setText("");
								me.getView().byId("trendVBox4Text3").setText("");
								me.getView().byId("trendVBox4Text4").setText("");
							}
	
	
							tempBPCountArrayFilter.reverse();
	
							if (tempBPCountArrayFilter.length > 2) {
								me.getView().byId("trendVBox3Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox3Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox3Text4").setText(tempBPCountArrayFilter[2].upgradeItem);
							} else if (tempBPCountArrayFilter.length == 2) {
								me.getView().byId("trendVBox3Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox3Text3").setText(tempBPCountArrayFilter[1].upgradeItem);
								me.getView().byId("trendVBox3Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 1) {
								me.getView().byId("trendVBox3Text2").setText(tempBPCountArrayFilter[0].upgradeItem);
								me.getView().byId("trendVBox3Text3").setText("");
								me.getView().byId("trendVBox3Text4").setText("");
							} else if (tempBPCountArrayFilter.length == 0) {
								me.getView().byId("trendVBox3Text2").setText("");
								me.getView().byId("trendVBox3Text3").setText("");
								me.getView().byId("trendVBox3Text4").setText("");
							}
	
	
						}
					
					}else{
						me.getView().byId("trendVBox2Text2").setText("");
						me.getView().byId("trendVBox2Text3").setText("");
						me.getView().byId("trendVBox2Text4").setText("");
						
						me.getView().byId("trendVBox1Text2").setText("");
						me.getView().byId("trendVBox1Text3").setText("");
						me.getView().byId("trendVBox1Text4").setText("");
								
						me.getView().byId("trendVBox3Text2").setText("");
						me.getView().byId("trendVBox3Text3").setText("");
						me.getView().byId("trendVBox3Text4").setText("");
						
						me.getView().byId("trendVBox4Text2").setText("");
						me.getView().byId("trendVBox4Text3").setText("");
						me.getView().byId("trendVBox4Text4").setText("");
						
						me.getView().getModel("testModelTile").setData([]);
					}
				},
				function(oError) {
					console.log("Error 127");
				});

		},
		CallCustomerData: function(mdl, para, fromCompDate, toCompDate, fillBP) {
			var tempTestAry = [];
			var me = this;
			var tempODATAPreCheck = [];
			var tempODATAPreCheckFilter = [];
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
						var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
						var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
						var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
						var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
						var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
						
						
						
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
			
			if (fillBP == "") {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				}
			} else {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,RESULT,COMPANYSCHEMA,COMPANY,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				}
			}

			mdl.read(
				url,
				null, null, true,
				function(oData, oResponse) {
					if(oData.results.length>0){
						tempODATAPreCheck = oData.results;
						
						for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
							var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								
							// if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							// 	tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Recruiting"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;	
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
							// 	for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 			break;
							// 		}
									
							// 	}
							// }
							
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							
							}
						}
						
						if (tempODATAPreCheckFilter.length > 0) {
	
							var oModelVersion = new sap.ui.model.json.JSONModel();
							oModelVersion.setSizeLimit(1000);
							sap.ui.getCore().setModel(oModelVersion, "oModelVersion");
	
							var oModelCustomer = new sap.ui.model.json.JSONModel();
							oModelCustomer.setSizeLimit(1000);
							sap.ui.getCore().setModel(oModelCustomer, "oModelCustomer");
	
							var tempODATA = [];
							var tempdataRg = [];
							var tempTimeData = [];
							var custName = [];
							var custUsers = [];
	
							tempdataRg.push({
								version: "Build Version",
								versionPara: "Version"
							});
							var tempData = [];
							var count = 0;
							for (var q = 0; q < tempODATAPreCheckFilter.length; q++) {
								// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
								// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
								// }
								// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
								// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
								// }
								if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
									if (tempODATAPreCheckFilter[q].COMPANYSCHEMA != null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
									// if (tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf(
									// 		"stg") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1) {
										tempODATA.push(tempODATAPreCheckFilter[q].COMPANY);
	
										if (tempODATAPreCheckFilter[q].RESULT == "true") {
											var stat = "Success";
										} else if (tempODATAPreCheckFilter[q].RESULT == "false") {
											var stat = "Failure";
										}
	
										if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1] == undefined) {
											if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1] == undefined) {
												// tempTimeData.push({
												// 	company: tempODATAPreCheckFilter[q].COMPANY,
												// 	result: stat,
												// 	upgrade: "EC " + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
												// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toDateString(),
												// 	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP
												// });
												if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1] == undefined) {
													if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1] == undefined) {
														if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1] == undefined){
															tempTimeData.push({
																company: tempODATAPreCheckFilter[q].COMPANY,
																result: stat,
																upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
																timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
																puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
															});
														}else{
															tempTimeData.push({
																company: tempODATAPreCheckFilter[q].COMPANY,
																result: stat,
																upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1],
																timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
																puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
															});
														}
														
													} else {
														if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.indexOf("In-app learning")>-1){
															tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															result: stat,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT,
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
														});
														}else{
															tempTimeData.push({
															company: tempODATAPreCheckFilter[q].COMPANY,
															result: stat,
															upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1],
															timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
															puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
														});
														}
														
													}
												} else {
													tempTimeData.push({
														company: tempODATAPreCheckFilter[q].COMPANY,
														result: stat,
														upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
														timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
													});
												}
											} else {
												tempTimeData.push({
													company: tempODATAPreCheckFilter[q].COMPANY,
													result: stat,
													upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
													timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
													puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
												});
											}
										} else {
											tempTimeData.push({
												company: tempODATAPreCheckFilter[q].COMPANY,
												result: stat,
												upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
												timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
												puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
											});
	
										}
	
										// tempTimeData.push({
										// 	company: oData.results[q].COMPANY,
										// 	upgrade: oData.results[q].UPGRADE_ELEMENT,
										// 	timestamp: oData.results[q].TIME_STAMP.toDateString()
										// });
									// }
								}
								}
							}
	
							var unique = tempODATA.filter(function(itm, i, tempODATA) {
								return i == tempODATA.indexOf(itm);
							});
	
							// var uniqueVersion = tempData.reduce(function(item, e1) {
							// 	var matches = item.filter(function(e2) {
							// 		return e1.version == e2.version;
							// 	});
							// 	if (matches.length == 0) {
							// 		item.push(e1);
							// 	}
							// 	return item;
							// }, []);
	
							// uniqueVersion.unshift({
							// 	version: "Build Version",
							// 	versionPara: "Version"
							// });
	
							// var oDataGrp = {
							// 	"stlist": uniqueVersion
							// };
	
							// oModelVersion.setData(oDataGrp);
							// me.getView().byId("ddlVersion").setModel(oModelVersion);
	
							count = me.NumberFormat(Math.round(unique.length));
							// me.getView().byId("selTerLblDir").setInfo(count["value"] + count["type"]);
	
							var tempTimeAry = [];
							
							
							var tempBPCountArrayFilter = [];
							
							// if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
							// 	for(var t1=0;t1<tempTimeData.length;t1++){
							// 		if(tempTimeData[t1].upgrade.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
							// 			tempBPCountArrayFilter.push(tempTimeData[t1]);
							// 		}
							// 	}
							// }else{
								tempBPCountArrayFilter = tempTimeData;
							// }
							
	
							for (var w = 0; w < unique.length; w++) {
								for (var z = 0; z < tempBPCountArrayFilter.length; z++) {
									if (unique[w] == tempBPCountArrayFilter[z].company) {
										tempTimeAry.push({
											val: unique[w],
											upgrade: [],
											upgradeDisplay: [],
											upgradeString: "",
											time: (tempBPCountArrayFilter[z].timestamp).split(' ', 4).join(' '),
											puretime: tempBPCountArrayFilter[z].puretimestamp
										});
										break;
									}
								}
							}
	
	
							for (var w = 0; w < tempTimeAry.length; w++) {
								for (var z = 0; z < tempBPCountArrayFilter.length; z++) {
									if (tempTimeAry[w].val == tempBPCountArrayFilter[z].company) {
										tempTimeAry[w].upgrade.push(tempBPCountArrayFilter[z].upgrade);
										tempTimeAry[w].upgradeDisplay.push(tempBPCountArrayFilter[z].upgrade + " - " + tempBPCountArrayFilter[z].result + " - " + ((tempBPCountArrayFilter[z].timestamp).split(' ', 4).join(' ').replace(","," ")));
									}
								}
							}
	
							var uniqueData = [];
							for (var w = 0; w < tempTimeAry.length; w++) {
								var tempODATA = tempTimeAry[w].upgrade;
	
								uniqueData.push({
									index: w,
									data: tempODATA.filter(function(itm, i, tempODATA) {
										return i == tempODATA.indexOf(itm);
									})
								});
	
							}
							for (var w = 0; w < tempTimeAry.length; w++) {
								tempTimeAry[w].upgrade = uniqueData[w].data;
							}
	
							var uniqueDataDisplay = [];
							for (var w = 0; w < tempTimeAry.length; w++) {
								var tempODATA = tempTimeAry[w].upgradeDisplay;
	
								//  var result = tempODATA.reduce(function(p, c){
								//     if (c in p) {
								//       p[c]++;
								//     } else {
								//         p[c]=1;
								//     }
								//     return p;
								// }, {});
	
								uniqueDataDisplay.push({
									index: w,
									dataInput: [],
									data: tempODATA.reduce(function(p, c) {
										if (c in p) {
											p[c]++;
										} else {
											p[c] = 1;
										}
										return p;
	
									}, {})
								});
							}
	
							for (var w = 0; w < uniqueDataDisplay.length; w++) {
								var tempODATAInner = uniqueDataDisplay[w].data;
								for (var i in tempODATAInner) {
									if (tempODATAInner[i] == 1) {
										uniqueDataDisplay[w].dataInput.push(i + " - " + tempODATAInner[i] + " time");
									} else {
										uniqueDataDisplay[w].dataInput.push(i + " - " + tempODATAInner[i] + " times");
									}
	
								}
							}
	
							for (var w = 0; w < tempTimeAry.length; w++) {
	
								tempTimeAry[w].upgradeDisplay = uniqueDataDisplay[w].dataInput;
							}
	
							for (var w = 0; w < tempTimeAry.length; w++) {
								tempTimeAry[w].upgradeString = tempTimeAry[w].upgrade.toString();
							}
	
							var oDataGrpUsers = {
								"stlistUser": tempTimeAry
							};
							oModelCustomer.setData(oDataGrpUsers);
							me.getView().byId("listTable").setModel(oModelCustomer);
							
							setTimeout(function() { 
								var tempHeight = $(".heightHBox > div:nth-child(1)").height();
								if(tempHeight<300){
									me.getView().byId("tableSc").setHeight(204+"px");
									me.getView().byId("vboxTable").setHeight(500+"px");
								}else{
									me.getView().byId("tableSc").setHeight(tempHeight-204+"px");
									me.getView().byId("vboxTable").setHeight(tempHeight+100+"px");
								}
							}, 1000);
	
						}
					}else{
							var oModelCustomer = new sap.ui.model.json.JSONModel();
							oModelCustomer.setSizeLimit(1000);
							sap.ui.getCore().setModel(oModelCustomer, "oModelCustomer");
							
							var oDataGrpUsers = {
								"stlistUser": []
							};
							oModelCustomer.setData(oDataGrpUsers);
							me.getView().byId("listTable").setModel(oModelCustomer);
					}
				},
				function(oError) {
					console.log("Error 127");
				});

		},
		loadSuccessChartSub: function(mdl, para, fromCompDate, toCompDate, fillBP) {
			var tempDateResultTrue = [];
			var tempDateResultFalse = [];
			var me = this;
			var percent = 0;
			var totalRecords = 0;
			var tempODATAPreCheck = [];
			var tempODATAPreCheckFilter = [];
			// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
			var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
						var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
						var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
						var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
						var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
						var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
						
						
						
			var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();

			var me = this;
			if (fillBP == "") {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "'";
				}
			} else {
				if (para != "") {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
						para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
					// 	para + "' and TIME_STAMP ge datetime'" + fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				} else {
					if(deployKey=="All"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else if(deployKey=="CUST"){
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}else{
						var url =
						"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
						fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
					}
					
					// var url =
					// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANY,RESULT,COMPANYSCHEMA,TIME_STAMP&$orderby=TIME_STAMP desc&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'" +
					// 	fromCompDate + "' and TIME_STAMP le datetime'" + toCompDate + "' and " + fillBP;
				}
			}

			mdl.read(
				url,
				null, null, true,
				function(oData, oResponse) {
					
						tempODATAPreCheck = oData.results;
						
						for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
							var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
							var lastItem = majorBlk[majorBlk.length-1];
							if(lastItem.length!=32){
								
							// if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							// 	tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Recruiting"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;	
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// } else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
							// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding"){
							// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 				break;
							// 			}
							// 		}
							// 	}
							// }else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
							// 	for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
							// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
							// 			tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
							// 			break;
							// 		}
									
							// 	}
							// }
							
							if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
									tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
									for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
			// 							
										
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											
											// }
											}
										
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
									for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
											if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
												break;
											// }
										}
										
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
										
										
										
									}
								}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
									for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
									// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
			// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
			// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
			// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
			// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
			// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
										if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
												if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											
										 
											
										}else{
											var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
											var lastItem = majorBlk[majorBlk.length-1];
											if(lastItem.length==32){
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}else{
												majorBlk.pop();
												majorBlk.pop();
												var CompmajorBlk = majorBlk.join("_");
												if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
													// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
														tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
														break;	
													// }
												}
											}
										}
									}
								}
							
							
							}
						}
						
						if (tempODATAPreCheckFilter.length > 0) {
							for (var q = 0; q < tempODATAPreCheckFilter.length; q++) {
								// if(tempODATAPreCheckFilter[q].COMPANY=="CRUZ ROJA ESPAÑOLA"){
								// 	tempODATAPreCheckFilter[q].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
								// }
								// if(tempODATAPreCheckFilter[q].COMPANY=="Release"){
								// 	tempODATAPreCheckFilter[q].COMPANY="Stericycle Inc (de)";
								// }
								if(tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[q].COMPANY!="BPMCINSTANCE1"){
									if (tempODATAPreCheckFilter[q].COMPANYSCHEMA != null && tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
									// if (tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf(
									// 		"stg") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1 || tempODATAPreCheckFilter[q].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1) {
												
										
												
										// if (tempODATAPreCheckFilter[w].RESULT == "true") {
										// 	tempDateResultTrue.push({
										// 		cmpny: tempODATAPreCheckFilter[w].RESULT,
										// 		upgradeItem: tempODATAPreCheckFilter[w].UPGRADE_ELEMENT
										// 	});
										// } else if (tempODATAPreCheckFilter[w].RESULT == "false") {
										// 	tempDateResultFalse.push({
										// 		cmpny: tempODATAPreCheckFilter[w].RESULT,
										// 		upgradeItem: tempODATAPreCheckFilter[w].UPGRADE_ELEMENT
										// 	});
										// }
										
										
										
										
										
										if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1] == undefined) {
											if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1] == undefined) {
												if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1] == undefined) {
													if (tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1] == undefined) {
														
														if (tempODATAPreCheckFilter[q].RESULT == "true") {
															if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1]==undefined){
																tempDateResultTrue.push({
																	cmpny: tempODATAPreCheckFilter[q].RESULT,
																	upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT
																});
															}else{
																tempDateResultTrue.push({
																	cmpny: tempODATAPreCheckFilter[q].RESULT,
																	upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1]
																});
															}
															
														} else if (tempODATAPreCheckFilter[q].RESULT == "false") {
															if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1] == undefined){
																tempDateResultFalse.push({
																	cmpny: tempODATAPreCheckFilter[q].RESULT,
																	upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT
																});
															}else{
																tempDateResultFalse.push({
																	cmpny: tempODATAPreCheckFilter[q].RESULT,
																	upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1]
																});
															}
															
														}
										
														// tempTimeData.push({
														// 	company: tempODATAPreCheckFilter[q].COMPANY,
														// 	result: stat,
														// 	upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice")[1],
														// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														// 	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
														// });
													} else {
														if(tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.indexOf("In-app learning")>-1){
															if (tempODATAPreCheckFilter[q].RESULT == "true") {
															tempDateResultTrue.push({
																cmpny: tempODATAPreCheckFilter[q].RESULT,
																upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT
															});
														} else if (tempODATAPreCheckFilter[q].RESULT == "false") {
															tempDateResultFalse.push({
																cmpny: tempODATAPreCheckFilter[q].RESULT,
																upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT
															});
														}
														
														}else{
															if (tempODATAPreCheckFilter[q].RESULT == "true") {
															tempDateResultTrue.push({
																cmpny: tempODATAPreCheckFilter[q].RESULT,
																upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1]
															});
														} else if (tempODATAPreCheckFilter[q].RESULT == "false") {
															tempDateResultFalse.push({
																cmpny: tempODATAPreCheckFilter[q].RESULT,
																upgradeItem: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1]
															});
														}
														}
														
														
														
														// tempTimeData.push({
														// 	company: tempODATAPreCheckFilter[q].COMPANY,
														// 	result: stat,
														// 	upgrade: tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices")[1],
														// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
														// 	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
														// });
													}
												} else {
													if (tempODATAPreCheckFilter[q].RESULT == "true") {
														tempDateResultTrue.push({
															cmpny: tempODATAPreCheckFilter[q].RESULT,
															upgradeItem: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
														});
													} else if (tempODATAPreCheckFilter[q].RESULT == "false") {
														tempDateResultFalse.push({
															cmpny: tempODATAPreCheckFilter[q].RESULT,
															upgradeItem: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
														});
													}
														
													
													// tempTimeData.push({
													// 	company: tempODATAPreCheckFilter[q].COMPANY,
													// 	result: stat,
													// 	upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practices Employee Central")[1],
													// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
													// 	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
													// });
												}
											} else {
												if (tempODATAPreCheckFilter[q].RESULT == "true") {
													tempDateResultTrue.push({
														cmpny: tempODATAPreCheckFilter[q].RESULT,
														upgradeItem: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
													});
												} else if (tempODATAPreCheckFilter[q].RESULT == "false") {
													tempDateResultFalse.push({
														cmpny: tempODATAPreCheckFilter[q].RESULT,
														upgradeItem: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
													});
												}
													
												// tempTimeData.push({
												// 	company: tempODATAPreCheckFilter[q].COMPANY,
												// 	result: stat,
												// 	upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("bestpracticesEmployeeCentral")[1],
												// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
												// 	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
												// });
											}
										} else {
											if (tempODATAPreCheckFilter[q].RESULT == "true") {
												tempDateResultTrue.push({
													cmpny: tempODATAPreCheckFilter[q].RESULT,
													upgradeItem: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
												});
											} else if (tempODATAPreCheckFilter[q].RESULT == "false") {
												tempDateResultFalse.push({
													cmpny: tempODATAPreCheckFilter[q].RESULT,
													upgradeItem: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
												});
											}
												
											// tempTimeData.push({
											// 	company: tempODATAPreCheckFilter[q].COMPANY,
											// 	result: stat,
											// 	upgrade: "EC" + tempODATAPreCheckFilter[q].UPGRADE_ELEMENT.split("Best Practice Configurations Employee Central")[1],
											// 	timestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString(),//.toDateString(),
											// 	puretimestamp: tempODATAPreCheckFilter[q].TIME_STAMP.toUTCString()
											// });
										}
										
									// }
								}
								}
							}
							
							
							
							var tempBPCountArrayFilterFalse = [];
							
							// if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
							// 	for(var t1=0;t1<tempDateResultFalse.length;t1++){
							// 		if(tempDateResultFalse[t1].upgradeItem.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
							// 			tempBPCountArrayFilterFalse.push(tempDateResultFalse[t1]);
							// 		}
							// 	}
							// }else{
								tempBPCountArrayFilterFalse = tempDateResultFalse;
							// }
							
							var tempBPCountArrayFilterTrue = [];
							
							// if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
							// 	for(var t1=0;t1<tempDateResultTrue.length;t1++){
							// 		if(tempDateResultTrue[t1].upgradeItem.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
							// 			tempBPCountArrayFilterTrue.push(tempDateResultTrue[t1]);
							// 		}
							// 	}
							// }else{
								tempBPCountArrayFilterTrue = tempDateResultTrue;
							// }
							
	
							totalRecords = tempBPCountArrayFilterTrue.length + tempBPCountArrayFilterFalse.length;
							percent = ((tempBPCountArrayFilterTrue.length / totalRecords) * 100).toFixed(1);
							if (parseFloat(percent) >= 50) {
								me.getView().byId("radialMicroChartSub").setValueColor("Good");
							} else {
								me.getView().byId("radialMicroChartSub").setValueColor("Error");
							}
							me.getView().byId("radialMicroChartSub").setPercentage(parseFloat(percent));
	
							me.getView().byId("noSuccessValSub").setValue(parseFloat(tempBPCountArrayFilterTrue.length));
							me.getView().byId("noFailValSub").setValue(parseFloat(tempBPCountArrayFilterFalse.length));
							me.getView().byId("noUpgradeValSub").setValue(parseFloat(tempBPCountArrayFilterFalse.length + tempBPCountArrayFilterTrue.length));
	
							me.getView().byId("noSuccessValSub").setDisplayValue((tempBPCountArrayFilterTrue.length).toString());
							me.getView().byId("noFailValSub").setDisplayValue((tempBPCountArrayFilterFalse.length).toString());
							me.getView().byId("noUpgradeValSub").setDisplayValue((tempBPCountArrayFilterFalse.length + tempBPCountArrayFilterTrue.length).toString());
	
						}else{
							me.getView().byId("radialMicroChartSub").setPercentage(0);
							me.getView().byId("noSuccessValSub").setValue(0);
							me.getView().byId("noFailValSub").setValue(0);
							me.getView().byId("noUpgradeValSub").setValue(0);
	
							me.getView().byId("noSuccessValSub").setDisplayValue("");
							me.getView().byId("noFailValSub").setDisplayValue("");
							me.getView().byId("noUpgradeValSub").setDisplayValue("");
						}
					// }
					
				},
				function(oError) {
					console.log("Error 127");
				});
		},
		// loadChartBottom: function(mdl, para, fromCompDate,toCompDate) {
		// 	var tempBP = [];
		// 	var tempBPCountArray = [];
		// 	var tempBPCountArrayCore = [];
		// 	var oDataCHST = {};
		// 	var tempdataSP = [];
		// 	var totalCount = null;
		// 	var upgradeInput = [];
		// 	var countInput = [];
		// 	var tempdataSPUpgrade = [];
			
		// 	var tempODATAPreCheck = [];
		// 	var tempODATAPreCheckFilter = [];
		// 	var tempODATAPreCheckSub = [];
		// 	var tempODATAPreCheckFilterSub = [];
		// 	// var oModelUpgradeRecruitData = sap.ui.getCore().getModel("oModelUpgradeRecruit").getData();
		// 	var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
		// 				var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
		// 				var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
		// 				var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
		// 				var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
		// 				var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
						
						
						
			
		// 	var me = this;
		// 	var oModelColumnChartSVAccDetail = new sap.ui.model.json.JSONModel();
		// 	sap.ui.getCore().setModel(oModelColumnChartSVAccDetail, "oModelColumnChartSVAccDetail");

		// 	var oModelGroups = new sap.ui.model.json.JSONModel();
		// 	sap.ui.getCore().setModel(oModelGroups, "oModelGroups");
		// 	var deployKey = me.getView().byId("ddlDeploy").getSelectedKey();
												 
			
						
		// 	tempdataSP.push({
		// 		BP: "All Upgrade Elements",
		// 		BPKEY: "All"
		// 	});

		// 	if (para != "") {
		// 		if(deployKey=="All"){
		// 				var url =
		// 			"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
		// 			para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 			}else if(deployKey=="CUST"){
		// 				var url =
		// 			"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
		// 			para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 			}else{
		// 				var url =
		// 			"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
		// 			para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 			}
					
		// 		// var url =
		// 		// 	"/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and FILEVERSION eq '" +
		// 		// 	para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 	} else {
		// 		if(deployKey=="All"){
		// 				var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 			}else if(deployKey=="CUST"){
		// 				var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and substringof('_',UPGRADE_ELEMENT) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 			}else{
		// 				var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and indexof(UPGRADE_ELEMENT,'_') eq -1 and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 			}
					
		// 		// var url = "/UpgradeCenterResult?$select=UPGRADE_ELEMENT,COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 	}

		// 	mdl.read(url,
		// 		null, null, true,
		// 		function(oData, oResponse) {
		// 			if(oData.results.length > 0){
		// 				tempODATAPreCheck = oData.results;
		// 				for (var q = 0; q < tempODATAPreCheck.length; q++) {
							
		// 					var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
		// 					var lastItem = majorBlk[majorBlk.length-1];
		// 					if(lastItem.length!=32){
								
		// 					// if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
		// 					// 	tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 					// } else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
		// 					// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
		// 					// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
		// 					// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Recruiting"){
		// 					// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 					// 				break;	
		// 					// 			}
		// 					// 		}
		// 					// 	}
		// 					// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
		// 					// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
		// 					// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
		// 					// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
		// 					// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 					// 				break;
		// 					// 			}
		// 					// 		}
		// 					// 	}
		// 					// }  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
		// 					// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
		// 					// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
		// 					// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
		// 					// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 					// 				break;
		// 					// 			}
		// 					// 		}
		// 					// 	}
		// 					// } else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
		// 					// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
		// 					// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
		// 					// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
		// 					// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 					// 				break;
		// 					// 			}
		// 					// 		}
		// 					// 	}
		// 					// }else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
		// 					// 	for(var a2=0;a2<oModelUpgradeRecruitData.length;a2++){
		// 					// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT==oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
		// 					// 			if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding"){
		// 					// 				tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 					// 				break;
		// 					// 			}
		// 					// 		}
		// 					// 	}
		// 					// }else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
		// 					// 	for(var a2=0; a2<oModelUpgradeRecruitData.length; a2++){
		// 					// 		if(tempODATAPreCheck[q].UPGRADE_ELEMENT!=oModelUpgradeRecruitData[a2].UPGRADE_ELEMENT){
		// 					// 			tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 					// 			break;
		// 					// 		}
									
		// 					// 	}
		// 					// }
							
		// 					if(me.getView().byId("ddlProd").getSelectedKey()=="All"){
							
								
		// 							tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 						}  else if(me.getView().byId("ddlProd").getSelectedKey()=="RM"){
			
		// 							for(var a2=0;a2<datatempoModelUpgradeRecruitREC.length;a2++){
										
		// 								if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
		// 									if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
		// 											// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
											
		// 								}else{
		// 									var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
		// 									var lastItem = majorBlk[majorBlk.length-1];
		// 									if(lastItem.length==32){
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
		// 											// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}else{
		// 										majorBlk.pop();
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitREC[a2].UPGRADE_ELEMENT){
		// 											// if(datatempoModelUpgradeRecruitREC[a2].PRODUCT=="Recruiting"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}
		// 								}
										
										
										
										
										
		// 							}
		// 						}  else if(me.getView().byId("ddlProd").getSelectedKey()=="SM"){
		// 							for(var a2=0;a2<datatempoModelUpgradeRecruitSM.length;a2++){
										
		// 	// 							
										
										
		// 									if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
												
										
		// 									if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
											
		// 								}else{
		// 									var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
		// 									var lastItem = majorBlk[majorBlk.length-1];
		// 									if(lastItem.length==32){
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}else{
		// 										majorBlk.pop();
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitSM[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Succession Management"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}
		// 								}
										
										
										
										
		// 							}
		// 						}  else if(me.getView().byId("ddlProd").getSelectedKey()=="PG"){
		// 							for(var a2=0;a2<datatempoModelUpgradeRecruitPG.length;a2++){
										
										
									
										
										
		// 								if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
										
		// 										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
											
		// 								}else{
		// 									var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
		// 									var lastItem = majorBlk[majorBlk.length-1];
		// 									if(lastItem.length==32){
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}else{
		// 										majorBlk.pop();
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitPG[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Performance and Goals"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}
		// 								}
										
										
										
										
		// 							}
		// 						}  else if(me.getView().byId("ddlProd").getSelectedKey()=="CO"){
		// 							for(var a2=0;a2<datatempoModelUpgradeRecruitCO.length;a2++){
										
									
			
		// 								if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
		// 								if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
		// 									// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
		// 										tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 										break;
											
		// 									// }
		// 									}
										
		// 								}else{
		// 									var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
		// 									var lastItem = majorBlk[majorBlk.length-1];
		// 									if(lastItem.length==32){
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}else{
		// 										majorBlk.pop();
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitCO[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Compensation"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}
		// 								}
										
										
										
										
		// 							}
		// 						}  else if(me.getView().byId("ddlProd").getSelectedKey()=="ON"){
		// 							for(var a2=0;a2<datatempoModelUpgradeRecruitON.length;a2++){
										
									
										
			
		// 								if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
		// 									if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
		// 									// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
		// 										tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 										break;
		// 									// }
		// 								}
										
											
		// 								}else{
		// 									var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
		// 									var lastItem = majorBlk[majorBlk.length-1];
		// 									if(lastItem.length==32){
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}else{
		// 										majorBlk.pop();
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitON[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding" || oModelUpgradeRecruitData[a2].PRODUCT=="Onboarding 2.0"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}
		// 								}
										
										
										
		// 							}
		// 						}  else if(me.getView().byId("ddlProd").getSelectedKey()=="EC"){
		// 							for(var a2=0; a2<datatempoModelUpgradeRecruitEC.length; a2++){
										
		// 							// var datatempoModelUpgradeRecruitON = sap.ui.getCore().getModel("oModelUpgradeRecruitON").getData();
		// 	// var datatempoModelUpgradeRecruitREC = sap.ui.getCore().getModel("oModelUpgradeRecruitREC").getData();
		// 	// var datatempoModelUpgradeRecruitSM = sap.ui.getCore().getModel("oModelUpgradeRecruitSM").getData();
		// 	// var datatempoModelUpgradeRecruitPG = sap.ui.getCore().getModel("oModelUpgradeRecruitPG").getData();
		// 	// var datatempoModelUpgradeRecruitCO = sap.ui.getCore().getModel("oModelUpgradeRecruitCO").getData();
		// 	// var datatempoModelUpgradeRecruitEC = sap.ui.getCore().getModel("oModelUpgradeRecruitEC").getData();
										
										
		// 								if(tempODATAPreCheck[q].UPGRADE_ELEMENT.indexOf("_")==-1){
											
										
		// 										if(tempODATAPreCheck[q].UPGRADE_ELEMENT==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
											
										 
											
		// 								}else{
		// 									var majorBlk = tempODATAPreCheck[q].UPGRADE_ELEMENT.split("_");
		// 									var lastItem = majorBlk[majorBlk.length-1];
		// 									if(lastItem.length==32){
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
		// 											// if(datatempoModelUpgradeRecruitEC[a2].PRODUCT=="Employee Central"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}else{
		// 										majorBlk.pop();
		// 										majorBlk.pop();
		// 										var CompmajorBlk = majorBlk.join("_");
		// 										if(CompmajorBlk==datatempoModelUpgradeRecruitEC[a2].UPGRADE_ELEMENT){
		// 											// if(oModelUpgradeRecruitData[a2].PRODUCT=="Employee Central"){
		// 												tempODATAPreCheckFilter.push(tempODATAPreCheck[q]);
		// 												break;	
		// 											// }
		// 										}
		// 									}
		// 								}
		// 							}
		// 						}
							
							
		// 					}
		// 				}
						
		// 				if (tempODATAPreCheckFilter.length > 0) {
		// 				for (var w = 0; w < tempODATAPreCheckFilter.length; w++) {
		// 					// if(tempODATAPreCheckFilter[w].COMPANY=="CRUZ ROJA ESPAÑOLA"){
		// 					// 	tempODATAPreCheckFilter[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
		// 					// }
		// 					// if(tempODATAPreCheckFilter[w].COMPANY=="Release"){
		// 					// 	tempODATAPreCheckFilter[w].COMPANY="Stericycle Inc (de)";
		// 					// }
		// 					if(tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE4" && tempODATAPreCheckFilter[w].COMPANY!="BPMCINSTANCE1"){
		// 					if (tempODATAPreCheckFilter[w].COMPANYSCHEMA != null && tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
		// 						// if (tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf(
		// 						// 		"stg") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
		// 							tempBP.push(tempODATAPreCheckFilter[w].UPGRADE_ELEMENT);
		// 						// }
		// 					}
		// 					}

		// 				}
		// 				var uniqueBP = tempBP.filter(function(itm, i, tempBP) {
		// 					return i == tempBP.indexOf(itm);
		// 				});
						
						
		// 				for (var z = 0; z < uniqueBP.length; z++) {
							
		// 					var fillBPNewAr = [];

							
		// 					if (uniqueBP[z].split("Best Practice Configurations Employee Central")[1] == undefined) {
		// 						if(uniqueBP[z].split("bestpracticesEmployeeCentral")[1] == undefined){
		// 							// tempdataSP.push({
		// 							// 	BP: "EC "+uniqueBP[z].split("Best Practices Employee Central")[1],
		// 							// 	BPKEY: uniqueBP[z]
		// 							// });
									
		// 							if(uniqueBP[z].split("Best Practices Employee Central")[1] == undefined){
		// 								if(uniqueBP[z].split("Best Practices")[1]==undefined){
											
		// 									if(uniqueBP[z].split("Best Practice")[1]==undefined){
		// 										tempdataSP.push({
		// 											BP: uniqueBP[z],
		// 											BPKEY: uniqueBP[z]
		// 										});
		// 									}else{
		// 										tempdataSP.push({
		// 											BP: uniqueBP[z].split("Best Practice")[1],
		// 											BPKEY: uniqueBP[z]
		// 										});
		// 									}
											
											
		// 								}else{
		// 									if(uniqueBP[z].indexOf("In-app learning")>-1){
		// 										tempdataSP.push({
		// 											BP: uniqueBP[z],
		// 											BPKEY: uniqueBP[z]
		// 										});
		// 									}else{
												
		// 										tempdataSP.push({
		// 											BP: uniqueBP[z].split("Best Practices")[1],
		// 											BPKEY: uniqueBP[z]
		// 										});
		// 									}
		// 								}
		// 							}else{
		// 								tempdataSP.push({
		// 									BP: "EC"+uniqueBP[z].split("Best Practices Employee Central")[1],
		// 									BPKEY: uniqueBP[z]
		// 								});
		// 							}
												
												
		// 						}else{
		// 							tempdataSP.push({
		// 								BP: "EC"+uniqueBP[z].split("bestpracticesEmployeeCentral")[1],
		// 								BPKEY: uniqueBP[z]
		// 							});
		// 						}
		// 					} else {
		// 						tempdataSP.push({
		// 							BP: "EC"+uniqueBP[z].split("Best Practice Configurations Employee Central")[1],
		// 							BPKEY: uniqueBP[z]
		// 						});
		// 					}

		// 					var oModelGroups = sap.ui.getCore().getModel("oModelGroups");
		// 					oModelGroups.setProperty('/splist', tempdataSP);
							
							
		// 					for(var t=0;t<tempODATAPreCheckFilter.length;t++){
		// 						if(uniqueBP[z]==tempODATAPreCheckFilter[t].UPGRADE_ELEMENT){
		// 							fillBPNewAr.push({
		// 								UPGRADE_ELEMENT:tempODATAPreCheckFilter[t].UPGRADE_ELEMENT,
		// 								COMPANY :tempODATAPreCheckFilter[t].COMPANY,
		// 								COMPANYSCHEMA:tempODATAPreCheckFilter[t].COMPANYSCHEMA
		// 							});
		// 						}
								
								
		// 						if(t==tempODATAPreCheckFilter.length-1){
									
		// 							var tempCmpny = [];
									
		// 							tempODATAPreCheckSub = fillBPNewAr;
		// 							tempODATAPreCheckFilterSub = tempODATAPreCheckSub;
						
		// 							if (tempODATAPreCheckFilterSub.length > 0) {
		// 								for (var w = 0; w < tempODATAPreCheckFilterSub.length; w++) {
		// 									// if(tempODATAPreCheckFilterSub[w ].COMPANY=="CRUZ ROJA ESPAÑOLA"){
		// 									// 	tempODATAPreCheckFilterSub[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
		// 									// }
		// 									// if(tempODATAPreCheckFilterSub[w].COMPANY=="Release"){
		// 									// 	tempODATAPreCheckFilterSub[w].COMPANY="Stericycle Inc (de)";
		// 									// }
		// 									if(tempODATAPreCheckFilterSub[w].COMPANY!="BPMCINSTANCE4"  && tempODATAPreCheckFilterSub[w].COMPANY!="BPMCINSTANCE1"){
		// 										if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA != null && tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("sfsales")==-1) {
		// 											tempCmpny.push(tempODATAPreCheckFilterSub[w].COMPANY);
		// 									}
		// 									}

		// 								}
		// 								var uniqueCmpny = tempCmpny.filter(function(itm, i, tempCmpny) {
		// 									return i == tempCmpny.indexOf(itm);
		// 								});
										
										
		// 								if(uniqueBP[z].split("Best Practices Employee Central")[1] == undefined){
		// 								if(uniqueBP[z].split("Best Practices")[1]==undefined){
											
		// 									if(uniqueBP[z].split("Best Practice")[1]==undefined){
		// 										tempBPCountArray.push({
		// 											element: uniqueBP[z],
		// 											count: uniqueCmpny.length
		// 										});
												
												
		// 									}else{
												
		// 										tempBPCountArray.push({
		// 											element: uniqueBP[z].split("Best Practice")[1],
		// 											count: uniqueCmpny.length
		// 										});
												
		// 									}
											
											
		// 								}else{
		// 									if(uniqueBP[z].indexOf("In-app learning")>-1){
		// 										tempBPCountArray.push({
		// 											element: uniqueBP[z],
		// 											count: uniqueCmpny.length
		// 										});
												
												
		// 									}else{
		// 										tempBPCountArray.push({
		// 											element: uniqueBP[z].split("Best Practices")[1],
		// 											count: uniqueCmpny.length
		// 										});
												
		// 									}
		// 								}
		// 								}else{
		// 								tempBPCountArray.push({
		// 									element: "EC"+uniqueBP[z].split("Best Practices Employee Central")[1],
		// 									count: uniqueCmpny.length
		// 								});
										
		// 							}
									

		// 								totalCount += uniqueCmpny.length;
		// 								var oModelColumnChartSVAccDetail = sap.ui.getCore().getModel("oModelColumnChartSVAccDetail");
										
		// 								// if(z == uniqueBP.length-1){
		// 								// 	var A = tempBPCountArray;
		// 								// 	var temp = {};
											
		// 								// 	for (var i=0; i<A.length; i++) {
		// 								// 	    temp[A[i].element] = temp[A[i].element] === undefined ? A[i].count : temp[A[i].element]+A[i].count;
		// 								// 	}
											
		// 								// 	A = [];
											
		// 								// 	for (var key in temp) {
		// 								// 	    A.push({element: key, count:temp[key]});
		// 								// 	}
											
		// 								// 	tempBPCountArray = A;
		// 								// 	tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
		// 								// 	tempBPCountArray.reverse();
		// 								// 	var tempBPCountArrayFilter = [];
											
		// 								// 	if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
		// 								// 		for(var t1=0;t1<tempBPCountArray.length;t1++){
		// 								// 			if(tempBPCountArray[t1].element.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
		// 								// 				tempBPCountArrayFilter.push(tempBPCountArray[t1]);
		// 								// 			}
		// 								// 		}
		// 								// 	}else{
		// 								// 		tempBPCountArrayFilter = tempBPCountArray;
		// 								// 	}
											
											
		// 								// 	for(var t=0;t<tempBPCountArrayFilter.length;t++){
		// 								// 		 upgradeInput.push(tempBPCountArrayFilter[t].element);
		// 								// 		 countInput.push(tempBPCountArrayFilter[t].count);
		// 								// 	}
										
		// 								// 	$("#repoContainerReviewUpgrade").find("svg").remove();
											
		// 								// 	Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
		// 								// 	    var path = [
		// 								// 	        // Arrow stem
		// 								// 	        'M', x + w * 0.5, y,
		// 								// 	        'L', x + w * 0.5, y + h * 0.7,
		// 								// 	        // Arrow head
		// 								// 	        'M', x + w * 0.3, y + h * 0.5,
		// 								// 	        'L', x + w * 0.5, y + h * 0.7,
		// 								// 	        'L', x + w * 0.7, y + h * 0.5,
		// 								// 	        // Box
		// 								// 	        'M', x, y + h * 0.9,
		// 								// 	        'L', x, y + h,
		// 								// 	        'L', x + w, y + h,
		// 								// 	        'L', x + w, y + h * 0.9
		// 								// 	    ];
		// 								// 	    return path;
		// 								// 	};
											
		// 								// 	var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
		// 								// 	    chart: {
		// 								// 	        type: 'column',
		// 								// 	        // height:'380',
		// 								// 	        // options3d: {
		// 								// 	        //     enabled: true,
		// 								// 	        //     alpha: 15,
		// 								// 	        //     beta: 15,
		// 								// 	        //     depth: 70
		// 								// 	        // }
		// 								// 	    },
		// 								// 	    colors:["#2B908F"],
		// 								// 	    title: {
		// 								// 	        text: ''
		// 								// 	    },
		// 								// 	    subtitle: {
		// 								// 	        text: ''
		// 								// 	    },
		// 								// 	    plotOptions: {
		// 								// 	        // column: {
		// 								// 	        //     depth: 25
		// 								// 	        // },
		// 								// 	        series: {
		// 								// 	            dataLabels: {
		// 								// 		            // align: 'center',
		// 								// 		            enabled: true,
		// 								// 		            color: '#fff'
		// 								// 		        },
		// 								// 		        states: {
		// 								//                     select: {
		// 								//                         color: '#63e5e4'    
		// 								//                     }
		// 								//                 },
		// 								//                 slicedOffset: 0,
		// 								//                 point: {
		// 								//                     events: {
		// 								//       //                 click: function(event){
																	
		// 								//       //                 	me.getView().byId("ddlSP").setSelectedKeys("All");
		// 								// 							// me.getView().byId("searchfield").setValue("");
																	
		// 								//       //                 	var tempAryFilter = [];
		// 								//       //                 	var tempAry = [];
		// 								//       //                     this.select(null, true);
		// 								//       //                     var ary = this.series.chart.getSelectedPoints();
										                            
		// 								//       //                     for(var q=0;q<ary.length;q++){
		// 								//       //                     	tempAryFilter.push(ary[q].category);
		// 								//       //                     }
										                            
		// 								//       //                     var ddlItems = me.getView().byId("ddlSP").getItems();
		// 								// 					  //        for(var q=0;q<ddlItems.length;q++){
		// 								// 					  //        	for(var j=0;j<tempAryFilter.length;j++){
		// 								// 						 //         	if(ddlItems[q].getText()==tempAryFilter[j]){
		// 								// 						 //         		tempAry.push(ddlItems[q].getKey());
		// 								// 						 //         	}	
		// 								// 					  //        	}
		// 								// 					  //        }
															          
		// 								//       //                     	if(ary.length==0){
		// 								// 					  //        		tempAry.push("All");
		// 								// 					  //      	}
		// 								// 					  //      	me.getView().byId("ddlSP").setSelectedKeys(tempAry);
		// 								// 					  //      	me.ddlSPChanged();
		// 								//       //                     // console.log(this.series.chart.getSelectedPoints());
		// 								//       //                 }
		// 								//                     }  
		// 								//                 } 
		// 								// 	        }
		// 								// 	    },
											    
		// 								// 	    legend: {
		// 								// 	    	itemStyle: {
		// 								// 	            color: '#ddd',
		// 								// 	        },
		// 								// 	        margin: 2,
		// 								// 	        // align: 'bottom',
		// 								// 	        // verticalAlign: 'bottom',
		// 								// 	        // layout: 'vertical',
		// 								// 	        // x: 15,
		// 								// 	        // y: 25,
		// 								// 	        // itemWidth: 50
		// 								// 	    },
		// 								// 	    xAxis: {
		// 								// 	        categories: upgradeInput,
		// 								// 	        labels: {
		// 								// 	            skew3d: true,
		// 								// 	            style: {
		// 								// 	                fontSize: '11.5px',
		// 								// 	                color: '#ddd',
		// 								// 	            },
		// 								// 	        //     useHTML: true,
		// 								// 			      //formatter() {
		// 								// 			      //  let label = this.value;
		// 								// 			      //  let title = this.value;
		// 								// 			      //  let style = `text-overflow: ellipsis; overflow: hidden;`; // <- YOUR OWN STYLE
		// 								// 			      //  return `<div style="${style}" title="${title}">${label}</div>`;
		// 								// 			      //},
		// 								// 	        },
		// 								// 	        // tickColor: '#bbb',
		// 								// 	        gridLineColor: 'transparent'
		// 								// 	    },
		// 								// 	    yAxis: {
		// 								// 	        title: {
		// 								// 	            text: null
		// 								// 	        },
		// 								// 	        labels: {
		// 								// 	            style: {
		// 								// 	                color: '#ddd'
		// 								// 	            }
		// 								// 	        },
		// 								// 	        // gridLineColor: '#bbb'
		// 								// 	    },
		// 								// 	    series: [{
		// 								// 	        name: 'Number of Customers',
		// 								// 	        data: countInput
		// 								// 	    }],
		// 								// 	      credits: {
		// 								// 		    enabled: false
		// 								// 		  },
		// 								// 	    navigation: {
		// 								// 	        buttonOptions: {
		// 								// 	            verticalAlign: 'top',
		// 								// 	            x:9,
		// 								// 	            y:-10
		// 								// 	        },
		// 								// 	        menuStyle: {
		// 								// 	            background: '#555'
		// 								// 	        },
		// 								// 	        menuItemStyle: {
		// 								// 	            color: '#ddd'
		// 								// 	        }
		// 								// 	    },
		// 								// 	    exporting: {
		// 								// 	     	chartOptions: {
		// 								// 			    chart: {
		// 								// 			      backgroundColor: '#555'
		// 								// 			    }
		// 								// 			  },
		// 								// 	        buttons: {
		// 								// 	            contextButton: {
		// 								// 	                symbol: 'download',
		// 								// 	                symbolFill: '#555'
		// 								// 	            }
		// 								// 	        },
		// 								// 	        filename: 'Upgrade Usage Chart'
		// 								// 	    }
		// 								// 	});
		// 								// }
										
										
		// 								oModelColumnChartSVAccDetail.setProperty('/data', tempBPCountArray.reverse());
		// 							}
									
		// 						}
								
		// 					}
							
							 
		// 					if(z == uniqueBP.length-1){
		// 									var A = tempBPCountArray;
		// 									var temp = {};
											
		// 									for (var i=0; i<A.length; i++) {
		// 									    temp[A[i].element] = temp[A[i].element] === undefined ? A[i].count : temp[A[i].element]+A[i].count;
		// 									}
											
		// 									A = [];
											
		// 									for (var key in temp) {
		// 									    A.push({element: key, count:temp[key]});
		// 									}
											
		// 									tempBPCountArray = A;
		// 									tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
		// 									tempBPCountArray.reverse();
		// 									var tempBPCountArrayFilter = [];
											
		// 									// if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
		// 									// 	for(var t1=0;t1<tempBPCountArray.length;t1++){
		// 									// 		if(tempBPCountArray[t1].element.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
		// 									// 			tempBPCountArrayFilter.push(tempBPCountArray[t1]);
		// 									// 		}
		// 									// 	}
		// 									// }else{
		// 										tempBPCountArrayFilter = tempBPCountArray;
		// 									// }
											
											
		// 									for(var t=0;t<tempBPCountArrayFilter.length;t++){
		// 										 upgradeInput.push(tempBPCountArrayFilter[t].element);
		// 										 countInput.push(tempBPCountArrayFilter[t].count);
		// 									}
										
		// 									$("#repoContainerReviewUpgrade").find("svg").remove();
											
		// 									Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
		// 									    var path = [
		// 									        // Arrow stem
		// 									        'M', x + w * 0.5, y,
		// 									        'L', x + w * 0.5, y + h * 0.7,
		// 									        // Arrow head
		// 									        'M', x + w * 0.3, y + h * 0.5,
		// 									        'L', x + w * 0.5, y + h * 0.7,
		// 									        'L', x + w * 0.7, y + h * 0.5,
		// 									        // Box
		// 									        'M', x, y + h * 0.9,
		// 									        'L', x, y + h,
		// 									        'L', x + w, y + h,
		// 									        'L', x + w, y + h * 0.9
		// 									    ];
		// 									    return path;
		// 									};
											
		// 									var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
		// 									    chart: {
		// 									        type: 'column',
		// 									        // height:'380',
		// 									        // options3d: {
		// 									        //     enabled: true,
		// 									        //     alpha: 15,
		// 									        //     beta: 15,
		// 									        //     depth: 70
		// 									        // }
		// 									    },
		// 									    colors:["#2B908F"],
		// 									    title: {
		// 									        text: ''
		// 									    },
		// 									    subtitle: {
		// 									        text: ''
		// 									    },
		// 									    plotOptions: {
		// 									        // column: {
		// 									        //     depth: 25
		// 									        // },
		// 									        series: {
		// 									            dataLabels: {
		// 										            // align: 'center',
		// 										            enabled: true,
		// 										            color: '#fff'
		// 										        },
		// 										        states: {
		// 								                    select: {
		// 								                        color: '#63e5e4'    
		// 								                    }
		// 								                },
		// 								                slicedOffset: 0,
		// 								                point: {
		// 								                    events: {
		// 								      //                 click: function(event){
																	
		// 								      //                 	me.getView().byId("ddlSP").setSelectedKeys("All");
		// 															// me.getView().byId("searchfield").setValue("");
																	
		// 								      //                 	var tempAryFilter = [];
		// 								      //                 	var tempAry = [];
		// 								      //                     this.select(null, true);
		// 								      //                     var ary = this.series.chart.getSelectedPoints();
										                            
		// 								      //                     for(var q=0;q<ary.length;q++){
		// 								      //                     	tempAryFilter.push(ary[q].category);
		// 								      //                     }
										                            
		// 								      //                     var ddlItems = me.getView().byId("ddlSP").getItems();
		// 													  //        for(var q=0;q<ddlItems.length;q++){
		// 													  //        	for(var j=0;j<tempAryFilter.length;j++){
		// 														 //         	if(ddlItems[q].getText()==tempAryFilter[j]){
		// 														 //         		tempAry.push(ddlItems[q].getKey());
		// 														 //         	}	
		// 													  //        	}
		// 													  //        }
															          
		// 								      //                     	if(ary.length==0){
		// 													  //        		tempAry.push("All");
		// 													  //      	}
		// 													  //      	me.getView().byId("ddlSP").setSelectedKeys(tempAry);
		// 													  //      	me.ddlSPChanged();
		// 								      //                     // console.log(this.series.chart.getSelectedPoints());
		// 								      //                 }
		// 								                    }  
		// 								                } 
		// 									        }
		// 									    },
											    
		// 									    legend: {
		// 									    	itemStyle: {
		// 									            color: '#ddd',
		// 									        },
		// 									        margin: 2,
		// 									        // align: 'bottom',
		// 									        // verticalAlign: 'bottom',
		// 									        // layout: 'vertical',
		// 									        // x: 15,
		// 									        // y: 25,
		// 									        // itemWidth: 50
		// 									    },
		// 									    xAxis: {
		// 									        categories: upgradeInput,
		// 									        labels: {
		// 									            skew3d: true,
		// 									            style: {
		// 									                fontSize: '11.5px',
		// 									                color: '#ddd',
		// 									            },
		// 									        //     useHTML: true,
		// 											      //formatter() {
		// 											      //  let label = this.value;
		// 											      //  let title = this.value;
		// 											      //  let style = `text-overflow: ellipsis; overflow: hidden;`; // <- YOUR OWN STYLE
		// 											      //  return `<div style="${style}" title="${title}">${label}</div>`;
		// 											      //},
		// 									        },
		// 									        // tickColor: '#bbb',
		// 									        gridLineColor: 'transparent'
		// 									    },
		// 									    yAxis: {
		// 									        title: {
		// 									            text: null
		// 									        },
		// 									        labels: {
		// 									            style: {
		// 									                color: '#ddd'
		// 									            }
		// 									        },
		// 									        // gridLineColor: '#bbb'
		// 									    },
		// 									    series: [{
		// 									        name: 'Number of Customers',
		// 									        data: countInput
		// 									    }],
		// 									      credits: {
		// 										    enabled: false
		// 										  },
		// 									    navigation: {
		// 									        buttonOptions: {
		// 									            verticalAlign: 'top',
		// 									            x:9,
		// 									            y:-10
		// 									        },
		// 									        menuStyle: {
		// 									            background: '#555'
		// 									        },
		// 									        menuItemStyle: {
		// 									            color: '#ddd'
		// 									        }
		// 									    },
		// 									    exporting: {
		// 									     	chartOptions: {
		// 											    chart: {
		// 											      backgroundColor: '#555'
		// 											    }
		// 											  },
		// 									        buttons: {
		// 									            contextButton: {
		// 									                symbol: 'download',
		// 									                symbolFill: '#555'
		// 									            }
		// 									        },
		// 									        filename: 'Upgrade Usage Chart'
		// 									    }
		// 									});
		// 								}
								
							

		// 					// if (para != "") {
		// 					// 	var subUrl =
		// 					// 		"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and UPGRADE_ELEMENT eq '" +
		// 					// 		uniqueBP[z] + "' and FILEVERSION eq '" + para + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 					// } else {
		// 					// 	var subUrl =
		// 					// 		"/UpgradeCenterResult?$select=COMPANYSCHEMA,COMPANY&$filter=(substringof('sfv4',COMPANYSCHEMA) or substringof('SFV4',COMPANYSCHEMA) or substringof('STOCKPM',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('stockpm',COMPANYSCHEMA) or substringof('GLOBUSER_DVLHCM20S',COMPANYSCHEMA) or substringof('globuser_dvlhcm20s',COMPANYSCHEMA) or substringof('STOCKPM000110_REF2',COMPANYSCHEMA) or substringof('stockpm000110_ref2',COMPANYSCHEMA) or substringof('STOCKPM172200_REF2',COMPANYSCHEMA) or substringof('stockpm172200_ref2',COMPANYSCHEMA) or substringof('STOCKPM170737_REF',COMPANYSCHEMA) or substringof('stockpm170737_ref',COMPANYSCHEMA)    or substringof('DC',COMPANYSCHEMA) or substringof('dc',COMPANYSCHEMA) or substringof('STG',COMPANYSCHEMA) or substringof('stg',COMPANYSCHEMA) or substringof('HANAPM',COMPANYSCHEMA) or substringof('hanapm',COMPANYSCHEMA)) and COMPANYSCHEMA ne '' and COMPANYID ne 'PAYNGPPRL' and COMPANYID ne 'SAPSDCHXM0001' and COMPANYID ne 'PAYNGPPRLE' and COMPANY ne '' and COMPANY ne 'SAP SF Cloud Engineering' and UPGRADE_ELEMENT eq '" +
		// 					// 		uniqueBP[z] + "' and TIME_STAMP ge datetime'"+fromCompDate+"' and TIME_STAMP le datetime'"+toCompDate+"'";
		// 					// }

		// 					// mdl.read(
		// 					// 	subUrl,
		// 					// 	null, null, true,
		// 					// 	function(oData, oResponse) {
		// 					// 		var tempCmpny = [];
									
		// 					// 		tempODATAPreCheckSub = oData.results;
		// 					// 		tempODATAPreCheckFilterSub = tempODATAPreCheckSub;
						
		// 					// 		if (tempODATAPreCheckFilterSub.length > 0) {
		// 					// 			for (var w = 0; w < tempODATAPreCheckFilterSub.length; w++) {
		// 					// 				if(tempODATAPreCheckFilterSub[w ].COMPANY=="CRUZ ROJA ESPAÑOLA"){
		// 					// 					tempODATAPreCheckFilterSub[w].COMPANY="CRUZ ROJA ESPAÑOLA DESARROLLO";
		// 					// 				}
		// 					// 				if(tempODATAPreCheckFilterSub[w].COMPANY=="Release"){
		// 					// 					tempODATAPreCheckFilterSub[w].COMPANY="Stericycle Inc (de)";
		// 					// 				}
		// 					// 				if(tempODATAPreCheckFilterSub[w].COMPANY!="BPMCINSTANCE4"  && tempODATAPreCheckFilterSub[w].COMPANY!="BPMCINSTANCE1"){
		// 					// 					if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA != null) {
		// 					// 			// 		if (tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("sfv4") > -1 || tempODATAPreCheckFilter[w].COMPANYSCHEMA.toLowerCase().indexOf("stockpm172200_ref2") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("hanapm") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf(
		// 					// 			// "stg") > -1 || tempODATAPreCheckFilterSub[w].COMPANYSCHEMA.toLowerCase().indexOf("dc") > -1) {
		// 					// 						tempCmpny.push(tempODATAPreCheckFilterSub[w].COMPANY);
		// 					// 					// }
		// 					// 				}
		// 					// 				}
		// 					// 				// if (tempODATAPreCheckFilterSub[w].COMPANY != '') {
		// 					// 				// 	tempCmpny.push(tempODATAPreCheckFilterSub[w].COMPANY);
		// 					// 				// }

		// 					// 			}
		// 					// 			var uniqueCmpny = tempCmpny.filter(function(itm, i, tempCmpny) {
		// 					// 				return i == tempCmpny.indexOf(itm);
		// 					// 			});

		// 					// 			if (oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practice Configurations Employee Central")[1] == undefined) {
		// 					// 				if(oResponse.requestUri.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1] == undefined){
		// 					// 					// tempBPCountArray.push({
		// 					// 					// 	element: "EC "+oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practices Employee Central")[1],
		// 					// 					// 	count: uniqueCmpny.length
		// 					// 					// });
		// 					// 					if(oResponse.requestUri.split("Best Practices Employee Central")[1] == undefined){
		// 					// 						if(oResponse.requestUri.split("Best Practices")[1]==undefined){
		// 					// 							// tempBPCountArray.push({
		// 					// 							// 	element: oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practice")[1],
		// 					// 							// 	count: uniqueCmpny.length
		// 					// 							// });
														
														
		// 					// 							if(oResponse.requestUri.split("Best Practice")[1]==undefined){
		// 					// 								tempBPCountArray.push({
		// 					// 									element: oResponse.requestUri.split("eq")[1].split("'")[1],
		// 					// 									count: uniqueCmpny.length
		// 					// 								});
															
		// 					// 							}else{
		// 					// 								tempBPCountArray.push({
		// 					// 									element: oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practice")[1],
		// 					// 									count: uniqueCmpny.length
		// 					// 								});
															
		// 					// 							}
														
														
		// 					// 						}else{
		// 					// 							if(oResponse.requestUri.indexOf("In-app learning")>-1){
		// 					// 								tempBPCountArray.push({
		// 					// 								element: oResponse.requestUri.split("eq")[1].split("'")[1],
		// 					// 								count: uniqueCmpny.length
		// 					// 							});
		// 					// 							}else{
		// 					// 								tempBPCountArray.push({
		// 					// 								element: oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practices")[1],
		// 					// 								count: uniqueCmpny.length
		// 					// 							});
		// 					// 							}
														
		// 					// 						}
		// 					// 					}else{
													
		// 					// 						// if(oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practices Employee Central")[1]==" Core (XX)"){
		// 					// 						// 	tempBPCountArrayCore.push({
		// 					// 						// 		element: "EC "+oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practices Employee Central")[1],
		// 					// 						// 		count: uniqueCmpny.length
		// 					// 						// 	});
		// 					// 						// }
		// 					// 						// else{
		// 					// 							tempBPCountArray.push({
		// 					// 								element: "EC"+oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practices Employee Central")[1],
		// 					// 								count: uniqueCmpny.length
		// 					// 							});
		// 					// 						// }
													
		// 					// 					}
		// 					// 				}else{
		// 					// 					// if(oResponse.requestUri.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1]==" Core (XX)"){
		// 					// 					// 	tempBPCountArrayCore.push({
		// 					// 					// 		element: "EC "+oResponse.requestUri.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1],
		// 					// 					// 		count: uniqueCmpny.length
		// 					// 					// 	});
		// 					// 					// }
		// 					// 					// else{
		// 					// 						tempBPCountArray.push({
		// 					// 							element: "EC"+oResponse.requestUri.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1],
		// 					// 							count: uniqueCmpny.length
		// 					// 						});
		// 					// 					// }
													
		// 					// 					// tempBPCountArray.push({
		// 					// 					// 	element: "EC "+oResponse.requestUri.split("eq")[1].split("'")[1].split("bestpracticesEmployeeCentral")[1],
		// 					// 					// 	count: uniqueCmpny.length
		// 					// 					// });
		// 					// 				}
		// 					// 			} else {
		// 					// 					tempBPCountArray.push({
		// 					// 						element: "EC"+oResponse.requestUri.split("eq")[1].split("'")[1].split("Best Practice Configurations Employee Central")[1],
		// 					// 						count: uniqueCmpny.length
		// 					// 					});
		// 					// 			}

		// 					// 			totalCount += uniqueCmpny.length;
		// 					// 			var oModelColumnChartSVAccDetail = sap.ui.getCore().getModel("oModelColumnChartSVAccDetail");
		// 					// 			// tempBPCountArray.sort(function(a,b) {return (a.element > b.element) ? 1 : ((b.element> a.element) ? -1 : 0);} );
		// 					// 			// tempBPCountArray =tempBPCountArray.reverse();
										
		// 					// 			if(z == tempBPCountArray.length){
		// 					// 				// var tempInp = tempBPCountArray.concat(tempBPCountArrayCore);
		// 					// 				// tempInp.reverse();
		// 					// 				// tempBPCountArray.reverse();
		// 					// 				var A = tempBPCountArray;
		// 					// 				var temp = {};
											
		// 					// 				for (var i=0; i<A.length; i++) {
		// 					// 				    temp[A[i].element] = temp[A[i].element] === undefined ? A[i].count : temp[A[i].element]+A[i].count;
		// 					// 				}
											
		// 					// 				A = [];
											
		// 					// 				for (var key in temp) {
		// 					// 				    A.push({element: key, count:temp[key]});
		// 					// 				}
											
		// 					// 				tempBPCountArray = A;
		// 					// 				tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
		// 					// 				tempBPCountArray.reverse();
		// 					// 				var tempBPCountArrayFilter = [];
											
		// 					// 				if(me.getView().byId("ddlSC").getSelectedKey()!="All"){
		// 					// 					for(var t1=0;t1<tempBPCountArray.length;t1++){
		// 					// 						if(tempBPCountArray[t1].element.indexOf(me.getView().byId("ddlSC").getSelectedKey())>-1){
		// 					// 							tempBPCountArrayFilter.push(tempBPCountArray[t1]);
		// 					// 							// tempBPCountArray.splice(t1, 1);
		// 					// 						}
		// 					// 					}
		// 					// 				}else{
		// 					// 					tempBPCountArrayFilter = tempBPCountArray;
		// 					// 				}
											
											
		// 					// 				for(var t=0;t<tempBPCountArrayFilter.length;t++){
		// 					// 					 upgradeInput.push(tempBPCountArrayFilter[t].element);
		// 					// 					 countInput.push(tempBPCountArrayFilter[t].count);
		// 					// 				}
										
		// 					// 				$("#repoContainerReviewUpgrade").find("svg").remove();
											
		// 					// 				Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
		// 					// 				    var path = [
		// 					// 				        // Arrow stem
		// 					// 				        'M', x + w * 0.5, y,
		// 					// 				        'L', x + w * 0.5, y + h * 0.7,
		// 					// 				        // Arrow head
		// 					// 				        'M', x + w * 0.3, y + h * 0.5,
		// 					// 				        'L', x + w * 0.5, y + h * 0.7,
		// 					// 				        'L', x + w * 0.7, y + h * 0.5,
		// 					// 				        // Box
		// 					// 				        'M', x, y + h * 0.9,
		// 					// 				        'L', x, y + h,
		// 					// 				        'L', x + w, y + h,
		// 					// 				        'L', x + w, y + h * 0.9
		// 					// 				    ];
		// 					// 				    return path;
		// 					// 				};
											
		// 					// 				var chart3d = Highcharts.chart('repoContainerReviewUpgrade', {
		// 					// 				    chart: {
		// 					// 				        type: 'column',
		// 					// 				        // height:'380',
		// 					// 				        // options3d: {
		// 					// 				        //     enabled: true,
		// 					// 				        //     alpha: 15,
		// 					// 				        //     beta: 15,
		// 					// 				        //     depth: 70
		// 					// 				        // }
		// 					// 				    },
		// 					// 				    colors:["#2B908F"],
		// 					// 				    title: {
		// 					// 				        text: ''
		// 					// 				    },
		// 					// 				    subtitle: {
		// 					// 				        text: ''
		// 					// 				    },
		// 					// 				    plotOptions: {
		// 					// 				        // column: {
		// 					// 				        //     depth: 25
		// 					// 				        // },
		// 					// 				        series: {
		// 					// 				            dataLabels: {
		// 					// 					            // align: 'center',
		// 					// 					            enabled: true,
		// 					// 					            color: '#fff'
		// 					// 					        },
		// 					// 					        states: {
		// 					// 			                    select: {
		// 					// 			                        color: '#63e5e4'    
		// 					// 			                    }
		// 					// 			                },
		// 					// 			                slicedOffset: 0,
		// 					// 			                point: {
		// 					// 			                    events: {
		// 					// 			       //                 click: function(event){
																	
		// 					// 			       //                 	me.getView().byId("ddlSP").setSelectedKeys("All");
		// 					// 										// me.getView().byId("searchfield").setValue("");
																	
		// 					// 			       //                 	var tempAryFilter = [];
		// 					// 			       //                 	var tempAry = [];
		// 					// 			       //                     this.select(null, true);
		// 					// 			       //                     var ary = this.series.chart.getSelectedPoints();
										                            
		// 					// 			       //                     for(var q=0;q<ary.length;q++){
		// 					// 			       //                     	tempAryFilter.push(ary[q].category);
		// 					// 			       //                     }
										                            
		// 					// 			       //                     var ddlItems = me.getView().byId("ddlSP").getItems();
		// 					// 								  //        for(var q=0;q<ddlItems.length;q++){
		// 					// 								  //        	for(var j=0;j<tempAryFilter.length;j++){
		// 					// 									 //         	if(ddlItems[q].getText()==tempAryFilter[j]){
		// 					// 									 //         		tempAry.push(ddlItems[q].getKey());
		// 					// 									 //         	}	
		// 					// 								  //        	}
		// 					// 								  //        }
															          
		// 					// 			       //                     	if(ary.length==0){
		// 					// 								  //        		tempAry.push("All");
		// 					// 								  //      	}
		// 					// 								  //      	me.getView().byId("ddlSP").setSelectedKeys(tempAry);
		// 					// 								  //      	me.ddlSPChanged();
		// 					// 			       //                     // console.log(this.series.chart.getSelectedPoints());
		// 					// 			       //                 }
		// 					// 			                    }  
		// 					// 			                } 
		// 					// 				        }
		// 					// 				    },
											    
		// 					// 				    legend: {
		// 					// 				    	itemStyle: {
		// 					// 				            color: '#ddd',
		// 					// 				        },
		// 					// 				        margin: 2,
		// 					// 				        // align: 'bottom',
		// 					// 				        // verticalAlign: 'bottom',
		// 					// 				        // layout: 'vertical',
		// 					// 				        // x: 15,
		// 					// 				        // y: 25,
		// 					// 				        // itemWidth: 50
		// 					// 				    },
		// 					// 				    xAxis: {
		// 					// 				        categories: upgradeInput,
		// 					// 				        labels: {
		// 					// 				            skew3d: true,
		// 					// 				            style: {
		// 					// 				                fontSize: '11.5px',
		// 					// 				                color: '#ddd',
		// 					// 				            },
		// 					// 				        //     useHTML: true,
		// 					// 						      //formatter() {
		// 					// 						      //  let label = this.value;
		// 					// 						      //  let title = this.value;
		// 					// 						      //  let style = `text-overflow: ellipsis; overflow: hidden;`; // <- YOUR OWN STYLE
		// 					// 						      //  return `<div style="${style}" title="${title}">${label}</div>`;
		// 					// 						      //},
		// 					// 				        },
		// 					// 				        // tickColor: '#bbb',
		// 					// 				        gridLineColor: 'transparent'
		// 					// 				    },
		// 					// 				    yAxis: {
		// 					// 				        title: {
		// 					// 				            text: null
		// 					// 				        },
		// 					// 				        labels: {
		// 					// 				            style: {
		// 					// 				                color: '#ddd'
		// 					// 				            }
		// 					// 				        },
		// 					// 				        // gridLineColor: '#bbb'
		// 					// 				    },
		// 					// 				    series: [{
		// 					// 				        name: 'Number of Customers',
		// 					// 				        data: countInput
		// 					// 				    }],
		// 					// 				      credits: {
		// 					// 					    enabled: false
		// 					// 					  },
		// 					// 				    navigation: {
		// 					// 				        buttonOptions: {
		// 					// 				            verticalAlign: 'top',
		// 					// 				            x:9,
		// 					// 				            y:-10
		// 					// 				        },
		// 					// 				        menuStyle: {
		// 					// 				            background: '#555'
		// 					// 				        },
		// 					// 				        menuItemStyle: {
		// 					// 				            color: '#ddd'
		// 					// 				        }
		// 					// 				    },
		// 					// 				    exporting: {
		// 					// 				     	chartOptions: {
		// 					// 						    chart: {
		// 					// 						      backgroundColor: '#555'
		// 					// 						    }
		// 					// 						  },
		// 					// 				        buttons: {
		// 					// 				            contextButton: {
		// 					// 				                symbol: 'download',
		// 					// 				                symbolFill: '#555'
		// 					// 				            }
		// 					// 				        },
		// 					// 				        filename: 'Upgrade Usage Chart'
		// 					// 				    }
		// 					// 				});
		// 					// 				// tempBPCountArray.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count> a.count) ? -1 : 0);} );
		// 					// 				// tempBPCountArray.reverse();
											
		// 					// 				// tempdataSPUpgrade = tempBPCountArray;
		// 					// 				// var oModelTrend = sap.ui.getCore().getModel("oModelTrend");
		// 					// 				// oModelTrend.setProperty('/splist', tempdataSPUpgrade);
											
		// 					// 			}
										
		// 					// 			oModelColumnChartSVAccDetail.setProperty('/data', tempBPCountArray.reverse());
										
		// 					// 		}
		// 					// 	},
		// 					// 	function(oError) {
		// 					// 		console.log("Error 127");
		// 					// 	});
								
								
		// 				}

		// 			}
		// 			}else{
		// 				var oDataGrp = {
		// 					"splist": []
		// 				};
		// 				// var oModelGroups = sap.ui.getCore().getModel("oModelGroups");

		// 				// oModelGroups.setData(oDataGrp);
		// 				// me.getView().byId("ddlSP").setModel(oModelGroups);
		// 				// me.getView().byId("ddlSP").setSelectedKeys("All");
						
		// 				// var oModelTrend = sap.ui.getCore().getModel("oModelTrend");
		// 				// oModelTrend.setProperty('/splist', []);
						
		// 				var oModelColumnChartSVAccDetail = sap.ui.getCore().getModel("oModelColumnChartSVAccDetail");
		// 				oModelColumnChartSVAccDetail.setProperty('/data', []);
						
		// 				// $("#repoContainerReviewUpgrade").find("svg").remove();
		// 			}
		// 		},
		// 		function(oError) {
		// 			console.log("Error 127");
		// 		});

		// },
		


		onTileSelect: function(oEvent) {
			var oTile = oEvent.getSource();
			var selectedDataSuccess = oTile.getHeader();
			var tempAry = [];

			this.getView().byId("ddlSPSuccess").setSelectedKeys("All");
			this.getView().byId("searchfield").setValue("");

			var ddlItems = this.getView().byId("ddlSPSuccess").getItems();
			for (var q = 0; q < ddlItems.length; q++) {
				// for(var j=0;j<this._selectedData.length;j++){
				if (ddlItems[q].getText() == selectedDataSuccess) {
					tempAry.push(ddlItems[q].getKey());
				}
				// }
			}

			if (tempAry.length == 0) {
				tempAry.push("All");
			}
			this.getView().byId("ddlSPSuccess").setSelectedKeys(tempAry);
			this.ddlSPChangedSuccess();
			
			
		},

		removeDuplicates: function(originalArray, prop) {
			var newArray = [];
			var lookupObject = {};

			for (var i in originalArray) {
				lookupObject[originalArray[i][prop]] = originalArray[i];
			}

			for (i in lookupObject) {
				newArray.push(lookupObject[i]);
			}
			return newArray;
		},
		NumberFormat: function(val) {
			if (val == "" || val == null) {
				val = 0;
			}
			if (isNaN(val)) {
				val = 0;
			}
			var num = {};
			val = Math.abs(val);
			if (val < 0) {
				val = Math.abs(val);
			} else {
				val;
			}
			if (val < 1000) {
				num["value"] = val.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
				num["type"] = "";
			} else if (val / 1000 < 1000) {
				num["value"] = (val / 1000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
				num["type"] = "K";
			} else {
				num["value"] = (val / 1000000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1');
				num["type"] = "M";
			}
			// else {
			//  num["value"] = (val / 1000000000).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			//  num["type"] = "B";
			// }
			return num;
		}
	});

	function MentionChartXbyMonth(pattern, value) {
		var typeA = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var typeB = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		if (pattern == "MM") {
			return (value + 1);
		}
		if (pattern == "MMM") {
			if (typeA[value - 1] == undefined) {
				typeA[value - 1] = "Dec";
			}
			return typeA[value - 1];
		}
		if (pattern == "MMMM") {
			return typeB[value - 1];
		}
		if (pattern == "MM/YYYY") {
			return "0";
		}
	};

	function MentionDayName(value) {
		var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return day[value];
	};

	function MentionGetMonthName(value) {
		var a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return a[value];
	};

	function GetDDMM(date) {
		var d = date;
		var day = d.getDate();
		var month = MentionGetMonthName(d.getMonth());
		var year = d.getFullYear();
		var result = year + "-" + month;
		return result;
	};

	function GetDDMMYY(date) {
		var d = date;
		var day = d.getDate();
		var month = MentionGetMonthName(d.getMonth());
		var year = d.getFullYear();
		var result = year + "-" + month + "-" + day;
		return result;
	};
	Date.prototype.YYYYMMDD = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
		var dd = this.getDate().toString();
		return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
	};

	function stringToDate(dateStr) {
		// var date = new Date(dateStr);
		// return date;
		var tempDate1 = dateStr.replace("-","/");
		var tempDate2 =tempDate1.replace("-","/");
		var date = new Date(tempDate2); 
		return date;

	};
});
Date.prototype.YYYYMMDD = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
};