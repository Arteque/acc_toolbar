'use strict';

class MicAccessTool {
	constructor(init) {

		this.init = init || {
			link: '',
			contact: '',
			buttonPosition: 'left',
			forceLang: '',
		};

		// Load language data from external file
		this.locale = null;
		this.currentLanguage = null;
		this.loadLanguageData();
	}
	
	initializeEventListeners() {
		this.toolBox = document.getElementById('mic-access-tool-box');
		this.toolBoxOpenButton = document.getElementById('mic-access-tool-general-button');
		this.toolBoxCloseButton = document.getElementById('mic-access-tool-box-close-button');

		this.toolBoxOpenButton.addEventListener('click', this.openBox.bind(this));
		this.toolBoxCloseButton.addEventListener('click', this.closeBox.bind(this));
		document.addEventListener('keyup', this.openCloseBoxKeyboard.bind(this));

		// CONTRAST CHANGE BUTTONS
		this.micContrastMonochrome = document.getElementById('mic-toolbox-contrast-monochrome');
		this.micContrastSoft = document.getElementById('mic-toolbox-contrast-soft');
		this.micContrastHard = document.getElementById('mic-toolbox-contrast-hard');

		this.micContrastMonochrome.addEventListener('click', this.contrastChange);
		this.micContrastSoft.addEventListener('click', this.contrastChange);
		this.micContrastHard.addEventListener('click', this.contrastChange);


		// DISABLE BUTONS
		this.micDisableButtonsAnimations = document.getElementById('mic-toolbox-disable-buttons-animations');
		this.micDisableButtonsKeyboard = document.getElementById('mic-toolbox-disable-buttons-keyboard');

		this.micDisableButtonsAnimations.addEventListener('click', this.onceButtonChange);
		this.micDisableButtonsKeyboard.addEventListener('click', this.onceButtonChange);


		// FONT CHANGE BUTTONS
		this.micToolboxFontsUp = document.getElementById('mic-toolbox-fonts-up');
		this.micToolboxFontsDown = document.getElementById('mic-toolbox-fonts-down');
		this.micToolboxFontsSimple = document.getElementById('mic-toolbox-fonts-simple');

		this.micToolboxFontsUp.addEventListener('click', this.fontsChange);
		this.micToolboxFontsDown.addEventListener('click', this.fontsChange);
		this.micToolboxFontsSimple.addEventListener('click', this.onceButtonChange);

		// CONTENT MARK BUTTONS
		this.micToolboxContentLinks = document.getElementById('mic-toolbox-content-links');
		this.micToolboxContentHeaders = document.getElementById('mic-toolbox-content-headers');
		this.micToolboxContentImages = document.getElementById('mic-toolbox-content-images');

		this.micToolboxContentLinks.addEventListener('click', this.onceButtonChange);
		this.micToolboxContentHeaders.addEventListener('click', this.onceButtonChange);
		this.micToolboxContentImages.addEventListener('click', this.onceButtonChange);

		// CURSORS CHANGE BUTTONS
		this.micToolboxCursorWhite = document.getElementById('mic-toolbox-cursor-big-white');
		this.micToolboxCursorBlack = document.getElementById('mic-toolbox-cursor-big-black');
		this.micToolboxZoomUp = document.getElementById('mic-toolbox-zoom-up');

		this.micToolboxCursorWhite.addEventListener('click', this.cursorChange);
		this.micToolboxCursorBlack.addEventListener('click', this.cursorChange);
		this.micToolboxZoomUp.addEventListener('click', this.onceButtonChange);

		// RESET APP BUTTON
		this.micToolboxDisableButtonsAll = document.getElementById('mic-toolbox-disable-buttons-reset-all');
		this.micToolboxDisableButtonsAll.addEventListener('click', this.resetApp.bind(this));
	}
	checkLanguageBox() {
		if (this.init.forceLang) {
			return;
		}
		var htmltag = document.documentElement.lang;
		if (htmltag && htmltag !== null) {
			var languageCode = htmltag;
			const translations = [...Object.keys(this.locale)]
			const documentLang = translations.find(item => item.includes(languageCode))
			console.log(documentLang)  	
			this.currentLanguage = this.locale[documentLang] || this.locale.en;
		}
		else {
			this.currentLanguage = this.locale.en;
		}

	}
	
	loadLanguageData() {
		// Load language data from external JSON file
		fetch('./js/language.json')
			.then(response => response.json())
			.then(data => {
				this.locale = data;
				this.currentLanguage = this.locale[this.init.forceLang] || this.locale.en;
				this.checkLanguageBox();
				this.buildToolBox();
				this.initializeEventListeners();
				this.initialApp();
			})
			.catch(error => {
				console.error('Error loading language data:', error);
				// Fallback to basic English if loading fails
				this.locale = {
					"en": {
						"btn_open": "accessibility menu",
						"btn_close": "close",
						"keyboard_root": "keyboard navigation",
						"disable_animattions": "block animations",
						"access_declaration": "accessibility statement",
						"debug_contacts": "report an accessibility problem",
						"reset_all_settings": "reset settings",
						"image_without_alt": "image without text",
						"contrast_block": { "header": "color contrast", "btn_monochrome": "uncolored<br>display", "btn_bright": "bright<br>contrast", "btn_invert": "invert<br>colors" },
						"text_block": { "header": "text size", "btn_font_up": "increase<br>text", "btn_font_down": "decrease<br>text", "btn_font_readable": "readable<br>text" },
						"content_block": { "header": "highlighting content", "btn_underline_links": "underline<br>links", "btn_underline_headers": "underline<br>headers", "btn_images_titles": "images<br>titles" },
						"zoom_block": { "header": "zoom in", "btn_cursor_white": "big white<br>cursor", "btn_cursor_black": "big black<br>cursor", "btn_zoom_in": "zoom<br>screen" }
					}
				};
				this.currentLanguage = this.locale.en;
				this.checkLanguageBox();
				this.buildToolBox();
				this.initializeEventListeners();
				this.initialApp();
			});
	}
	buildToolBox() {

		var obj = this.currentLanguage || this.locale.en;
		var htmlToolBox = '<button title="'+obj.btn_open+'" tabindex="1" id="mic-access-tool-general-button" class="mic-access-tool-general-button"><div><span>CTRL+F2</span> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAA+VBMVEUAAAAuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHF74uanAAAAUnRSTlMAAQMEBwgKCwwNDg8QERIVGhscHR8gJicqLzU2OTpFRklKTE1QUVVWXF1kZmtscHFzdXt/goORmJqdnqOlqrm6vL7AwcfIytPa3ODi5Ojz9fn7dlsVJQAAAU5JREFUOMvt08lSwkAUheETwIGIoqKIE4oogwMKziKoKCCDA//7P4yLhEq00mFhlSvvqk/ypXP7piL9rHOAc02sNQBYmwhrDqz9Bs4MD5Nhr04eDaclSWWgV5oPPsx8uQeUJEmpOgDdgu3uWau5+9mFLgD1lPuYXfkEoJ2f8XWU7wDwWYn7+ozsvDq9PWWnJGkq23Lyazby80zphnOL5tVV01020oGTSVRH+GpUnTMOMZrzXC4aOm8PTvgw//Bvoe1BOxTmARIJgL1Q+AjUpXvgIczFAFakVYBYCNwGOpLUAbZC4B2wIUmbwK3ZRYA3S5KsNyBihBlg31keABkjvISR+wNER3BhctYHnI7DGbxbBpgCZschDiwb4Alce+kGjg1wAIteWoJ+sFuAlj8/w0IgLMK6P69DIRC26X87pjXgJXjH/u73C7l+0TTIkPgFhXx2Xm9a0zIAAAAASUVORK5CYII=" alt="'+obj.btn_open+'"></div></button><div id="mic-access-tool-box" class="mic-access-tool-box"><div class="mic-access-tool-box-header">acc toolbox <button title="'+ obj.btn_close +'" id="mic-access-tool-box-close-button">&#10007; - '+ obj.btn_close +'</button></div><div class="mic-disable-buttons"><button title="'+obj.keyboard_root+'" id="mic-toolbox-disable-buttons-keyboard"><span>'+obj.keyboard_root+'</span> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACzJYIvAAAAFHRSTlMAAQIEBQYLhomeoLW31dna3Oj5+90/ykwAAABVSURBVBgZncFJEoJQEAXBeg3i+FHbuv9ZjWAFS83kD2cPrjhnT6wQEkIIYnXuvAbv9LwiVopACMsTsdqpk2ZdHIgVUpsQxOo83HymgXiqPbl4cON3X+q6BbAaNKDxAAAAAElFTkSuQmCC" alt="'+obj.keyboard_root+'"></button> <button title="'+obj.disable_animattions+'" id="mic-toolbox-disable-buttons-animations"><span>'+obj.disable_animattions+'</span> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMABwoNDxAcIS84PkBBVGR7guj3cqQiVwAAAFxJREFUGNNlz9sOgCAMA9AiIioKav//Xx2XIGAfluwkSzpAoY963CCOo1xRjETn/SRFnEyuwAJ4VtkQfIEse2CFJDcbKFcNZGkhSQdRfO7xySTNZlOiD/7/soNYvHcOCRT6qv0LAAAAAElFTkSuQmCC" alt="'+obj.disable_animattions+'"></button></div><div id="mic-toolbox-contrast-block" class="mic-contrast-block mic-buttons-block"><span class="mic-subtitle-span">'+obj.contrast_block.header+'</span> <button title="'+obj.contrast_block.btn_monochrome+'" id="mic-toolbox-contrast-monochrome"><span><img alt="'+obj.contrast_block.btn_monochrome+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8dlA9AAAAEnRSTlMAAQkLT1BRkpSVl5iam8zP7/E3Z1DDAAAAc0lEQVQokZWSSRaAIAxDG3FAEJXc/7BuVAbrlCX/vTRpEXkXrIX67kinEASSnErCSt8BTB9VICLNkgHkFk0kkec5LfojG3w51HDvY6s0IMnhDtgnq3p4lxZzF7csOKvNTbv+W+IFpGxBO6HXTyuCUf8MlTaTLhCpbG3L9gAAAABJRU5ErkJggg=="> </span><span>'+obj.contrast_block.btn_monochrome+'</span></button> <button title="'+obj.contrast_block.btn_bright+'" id="mic-toolbox-contrast-soft"><span><img alt="'+obj.contrast_block.btn_bright+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAAQgJCgtOT1BRkpSVl5iam8jMz+/x9WwUowAAAI1JREFUKJGNktsSwiAMRLNSehGrtdLz/5/qg2WwTBy7T4EzE5ZNzP5LKcm9n2F2iBaAx5HQ6BzYxijFaWvBGj5leH0BQQ7lEDZQ9TNUJ1PxpjsQK4js/0mH58wEcP0FUmnVOa1MC/QVjDUYQb44ds2A507C2kaS+84sDvl8iC4o3mDxRnj3R2umm78Mjd4oPA952m8bgAAAAABJRU5ErkJggg=="> </span><span>'+obj.contrast_block.btn_bright+'</span></button> <button title="'+obj.contrast_block.btn_invert+'" id="mic-toolbox-contrast-hard"><span><img alt="ניגודיות הפוכה" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHHRSTlMAAQUICQoLTk9QUXN0kpSVl5iam8jMz9re4O/xs7FJiwAAAKNJREFUKJGNktsOgzAMQ53Sles6GGNA8f9/5x4K6qgyDT9VPVLixAH+S7wX9b8ne4XISJLPM2Gma2CrnYhrthxMNj7t+wsIGSxMuyytgd1ISX4qmJkkZ4Pm8CYDSYcu9m3huM/jY7s1ggVCkvdfwB+lbkopyEiWqXmdFiNkKGC6de1OdgGSr2IfcMpXEsob4KpwfYkqSEGNWoSDHi0gD/0YMn0A2QIYmULugckAAAAASUVORK5CYII="> </span><span>'+obj.contrast_block.btn_invert+'</span></button></div><div class="mic-fonts-block mic-buttons-block"><span class="mic-subtitle-span">'+obj.text_block.header+'</span> <button title="'+obj.text_block.btn_font_up+'" id="mic-toolbox-fonts-up"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU2RlthYmN3mqbD3N75/ffAjZwAAABwSURBVBhXbc1XEoAgDATQxYJdsSLc/6AWigTJB7P7hgDgpuzxGy61SJiO9bEz0sdEJYlyU3movgSaii5MB/elsCa0llZH1MqZ1xVoBntvMVrOzHxgdu0LCA1Ev5xK6R3XWmKv7mAbsVtVd58Z6OS4AOceDZR02LMoAAAAAElFTkSuQmCC" alt="'+obj.text_block.btn_font_up+'"> </span><span>'+obj.text_block.btn_font_up+'</span> <span id="mic-toolbox-fonts-up-enabled"></span></button> <button title="'+obj.text_block.btn_font_down+'" id="mic-toolbox-fonts-down"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU3RlthYmN3mqbD3N75/WrPbOoAAABvSURBVBhXbcvZFoMgDEXRo610UpuO1Pz/h/oQoEThJefutQB6/DtA947BmSw3rqpORfUD4jSvWv/dqvafvCq7TEmfZsOj47yomJqFqC+OUbMm09mOAPdvMoEq2llZGc7SPHkz/W3MdGsQ4t5gGEuuW74NlKW6ljMAAAAASUVORK5CYII=" alt="'+obj.text_block.btn_font_down+'"> </span><span>'+obj.text_block.btn_font_down+'</span></button> <button title="'+obj.text_block.btn_font_readable+'" id="mic-toolbox-fonts-simple"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAALVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBoCg+AAAADnRSTlMABAYLDhAeKkBbZ5G32sGB+xIAAAA8SURBVAhbY2BgYDwDBscYGBiY3oHBc1QmEPC+g9DEM9cAjWyAMPcBzZmAwWTgewPXRlUmazADA0sokAEAvoY2e1eb61QAAAAASUVORK5CYII=" alt="'+obj.text_block.btn_font_readable+'"> </span><span>'+obj.text_block.btn_font_readable+'</span></button></div><div class="mic-content-block mic-buttons-block"><span class="mic-subtitle-span">'+obj.content_block.header+'</span> <button title="'+obj.content_block.btn_underline_links+'" id="mic-toolbox-content-links"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA81BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYh4bhAAAAUHRSTlMAAQIDBAUHCAoLDA0ODxATFRgcJCUnKCorLDc4OjxBQ0ZLTE9XW2FjZ3V5foKIjJKVmJqbnZ6jq62yub7AxcjKzM/V2tze4ujp7e/z9fn7/dE+l70AAADFSURBVBgZ1cHpQgFhGIbhZ/SpsbQorUqJUhHttEiZKCT3+R9Nw1/v/Oe6NP+8s05QVBTvidCVItzSy+z9cSFTgf6qtAunsrTJKpRn7MvQZV0TNxzIcMlHXKqcP3AkgwtoOQWAL4vf4zVdhrrczv6yZqR+mKoOYJTXjJV6/2XrBGg+QkmmTaCkApRladDmSzqEYxm+SW6vScrRleGOqibSjGRI/VLzpHiLa1kyQ+6XEp+8O5k2BoTenCIknxlXYooW87QI/gGkVyJRaE/etAAAAABJRU5ErkJggg==" alt="'+obj.content_block.btn_underline_links+'"> </span><span>'+obj.content_block.btn_underline_links+'</span></button> <button title="'+obj.content_block.btn_underline_headers+'" id="mic-toolbox-content-headers"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAACnRSTlMAARAeQEFSkZvvep8Y0AAAAElJREFUGJVjYKAmYHFxcVEAE2Au16pVqxzABDYug8QqAygBBqyrYATErFUwgiguGODkAp3kTp7JbKsEoARYMnNVqwKYIMaDVAIAmsgu7kDEZosAAAAASUVORK5CYII=" alt="'+obj.content_block.btn_underline_headers+'"> </span><span>'+obj.content_block.btn_underline_headers+'</span></button> <button title="'+obj.content_block.btn_images_titles+'" id="mic-toolbox-content-images"><span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAgVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtFS1lAAAAKnRSTlMAAQMEBQgQHyIkJi9DRElbXmtscHN3e4WIiYuSl52go7C1usDo6evx9flG5RBaAAAAfUlEQVQoz93SSRKCQAxA0UTBWVFQnGVQUf79D+jKotvuXrjlr1J5VVlFpNdt3+1PlRrMKrYbMzJ52s16eKQyDPICmIV5GeLBOhIRPT0z7/Eb5Xfh4QTYBHkCwFz3V/Vw3ADACy4ua03X0eEdZnlkc4Hd2Wa3Pzh39K79fuEPdQoeE+qkypwAAAAASUVORK5CYII=" alt="'+obj.content_block.btn_images_titles+'"> </span><span>'+obj.content_block.btn_images_titles+'</span></button></div><div class="mic-cursors-block mic-buttons-block"><span class="mic-subtitle-span">'+obj.zoom_block.header+'</span> <button title="'+obj.zoom_block.btn_cursor_white+'" id="mic-toolbox-cursor-big-white"><span><img alt="'+obj.zoom_block.btn_cursor_white+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAS1BMVEW9w8e+xMi/xMi/xcnCx8vCyMvIzdHL0NPS1tnT19nd4OLe4ePf4uTg4+Xq7O3s7u/x8vPx8/P19vf4+fn6+/v8/f3+/v7+//////+Nje9qAAAAXklEQVQoz83SNwKAMBADwTPJ5GDS/v+lFFByomXbaVTI7P/lmvdOMnSapaMd7Wi/mV6z52hHO9of2lJKS3B5EMtHODOXYzig8TiatbC+8xzNrAAq85sgCi7rj1P9pwslQQsBoORDzQAAAABJRU5ErkJggg=="> </span><span>'+obj.zoom_block.btn_cursor_white+'</span></button> <button title="'+obj.zoom_block.btn_cursor_black+'" id="mic-toolbox-cursor-big-black"><span><img alt="'+obj.zoom_block.btn_cursor_black+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAWlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLSV5RAAAAHXRSTlMAAQMEBgcTFCw3OFBUe3+AgoOIrbfHytrk7fX7/WJfHrcAAABoSURBVChTzdK7FoIwFAXRy1MSEXxHhfn/37SIK43JoWXa3Y7Z/us0fybJIB3tALNm4WiPzFlzydGemIvmrP/oHUJ41kW+/kviG6xtkX2zwFhib3aCV5XlhzOzHhiyHLuDE3w4bky1n75vow1/sgwkQQAAAABJRU5ErkJggg=="> </span><span>'+obj.zoom_block.btn_cursor_black+'</span></button> <button title="'+obj.zoom_block.btn_zoom_in+'" id="mic-toolbox-zoom-up"><span><img alt="'+obj.zoom_block.btn_zoom_in+'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA51BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWqgEeAAAATHRSTlMAAQIEBwgJCgwQGBkaISkqKywwMTM0Nzg/QEFCRUdNTlZdXnFzdHV3eXuRlJeYmp6goqOoqq2vsLLFx8jKzNrc3uDi6Onr7fHz9ff5oUSo3wAAAOJJREFUGBnVwelCAVEAhuF35mSZooW2U2lPiTYlTgtCDfXd//U0+HWUC/A8LIJw964dv13l+VdhoKlWir+Opfh8a22/LvUjZhWkqmEs11PH4AsHqgLZyEDmS2V8VrEBnCywIxk89zoj4WSB4FvreDraJOvcj3quBs86xDPUKpEmHNzqBM+79jDW9nRti/CiAzwV1Uk4WWBJWsaTl1aAmisCZbWZ0dJHhqmS1Ajwpfv63A6AVEWJhwBf1JVGjZtXTT2G+MylJjoNjV0wy2wcnZZyBHUlhswTPElqMldYGTXTLLhf0gcqXp6DTJoAAAAASUVORK5CYII="> </span><span>'+obj.zoom_block.btn_zoom_in+'</span></button></div><div class="link-access-page"><a class="atb-hide-if-empty" title="'+obj.access_declaration+'" id="mic-toolbox-link-nagishut" href="#" target="_blank">'+obj.access_declaration+'</a> <a class="atb-hide-if-empty" title="'+obj.debug_contacts+'" id="mic-toolbox-link-contact" href="#">'+obj.debug_contacts+'</a> <button title="'+obj.reset_all_settings+'" id="mic-toolbox-disable-buttons-reset-all"><span>'+obj.reset_all_settings+'</span> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAmVBMVEUAAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAAC9qi4cAAAAMnRSTlMAAQUGBwgNDg8QExUXGRojJiwvNTo7PFdYXF1hYmNnaGlwdHt+j5GSx9fZ2tzg8/X5+2glG4cAAAB3SURBVAgdbcHZAkJQAEXRLU0olUbSrNIkzv9/XNzrsbX4w788izzt0UpllHOMrarN0A0yaULNUxXSWOrjACclWHfNgIc8rEhHQOrQGJWqRbzlYUwlxXBWgrXSFfBVhVgLh9pB5XrQHd92tPYyij6tIHt989jlnx+BHA122Bbd9AAAAABJRU5ErkJggg==" alt="'+obj.reset_all_settings+'"></button></div><div dir="ltr" class="mic-toolbox-all-credits"><span>learn more about</span>&nbsp;&nbsp;<a target="_blank" href="https://mickidum.github.io/acc_toolbar/">toolbox</a></div></div>';
		var allCss = '@@include("../css/all.min.css")';

		var styleTag = document.createElement('style');
		styleTag.textContent = allCss;
		document.head.appendChild(styleTag);

		var createToolBox = document.createElement('div');
		createToolBox.id = 'mic-init-access-tool';
		createToolBox.innerHTML = htmlToolBox;

		document.body.insertBefore(createToolBox, document.body.firstChild);

	}
	// CONTRAST FUNCTION
	contrastChange(event) {
		event.preventDefault();

		if (document.body.classList.contains(this.id)) {
			this.classList.remove('vi-enabled');
			document.body.classList.remove(this.id);

			delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
		}
		else {
			var buttons = document.querySelectorAll('.mic-contrast-block button');
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].classList.remove('vi-enabled');
				document.body.classList.remove(buttons[i].id);

				delete window.MICTOOLBOXAPPSTATE.bodyClassList[buttons[i].id];
			}
			this.classList.add('vi-enabled');
			document.body.classList.add(this.id);

			window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id;
		}
		MicAccessTool.prototype.updateState();
	}
	// CURSOR CHANGE
	cursorChange(event) {
		event.preventDefault();

		if (document.body.classList.contains(this.id)) {
			this.classList.remove('vi-enabled');
			document.body.classList.remove(this.id);
			delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
		}
		else {
			var buttons = document.querySelectorAll('#mic-toolbox-cursor-big-black,#mic-toolbox-cursor-big-white');
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].classList.remove('vi-enabled');
				document.body.classList.remove(buttons[i].id);

				delete window.MICTOOLBOXAPPSTATE.bodyClassList[buttons[i].id];
			}
			this.classList.add('vi-enabled');
			document.body.classList.add(this.id);

			window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id;
		}
		MicAccessTool.prototype.updateState();
	}
	onceButtonChange(event) {
		event.preventDefault();

		if (this.id === 'mic-toolbox-disable-buttons-keyboard') {
			window.MICTOOLBOXAPPSTATE.keyboardRoot = !window.MICTOOLBOXAPPSTATE.keyboardRoot;
			MicAccessTool.prototype.keyboardRootEnable();
		}

		if (this.id === 'mic-toolbox-content-images') {
			MicAccessTool.prototype.imagesChange();
		}

		if (document.body.classList.contains(this.id)) {
			this.classList.remove('vi-enabled');
			document.body.classList.remove(this.id);

			delete window.MICTOOLBOXAPPSTATE.bodyClassList[this.id];
		}
		else {
			this.classList.add('vi-enabled');
			document.body.classList.add(this.id);

			window.MICTOOLBOXAPPSTATE.bodyClassList[this.id] = this.id;
		}
		MicAccessTool.prototype.updateState();
	}
	keyboardRootEnable() {
		if (window.MICTOOLBOXAPPSTATE.keyboardRoot) {
			var headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,input,select,textarea');
			for (var i = 0; i < headers.length; i++) {
				var item = headers[i];
				item.tabIndex = i + 1;
			}
		}
		else {
			window.location.reload();
		}
	}
	// FONTS CHANGE
	fontsChange(event) {
		event.preventDefault();

		// var mainBody = Number(document.body.style.fontSize.split('px')[0]);
		var counter = window.MICTOOLBOXAPPSTATE.fontSize;

		if (this.id === 'mic-toolbox-fonts-up') {
			if (counter >= 1.6) { return; }
			var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var font = window.getComputedStyle(item).getPropertyValue('font-size').split('px');
				var fontSize = Number(font[0]);
				item.style.fontSize = (fontSize * 1.1).toFixed() + 'px';
			}
			counter = (counter * 1.1).toFixed(2);
		}
		if (this.id === 'mic-toolbox-fonts-down') {
			if (counter <= 1) {
				window.MICTOOLBOXAPPSTATE.fontSize = 1;
				MicAccessTool.prototype.updateState();
				return;
			}
			var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var font = window.getComputedStyle(item).getPropertyValue('font-size').split('px');
				var fontSize = Number(font[0]);
				item.style.fontSize = (fontSize / 1.1).toFixed() + 'px';
			}
			counter = (counter / 1.1).toFixed(2);
		}

		window.MICTOOLBOXAPPSTATE.fontSize = counter;
		MicAccessTool.prototype.getFontsChanges(counter);
		MicAccessTool.prototype.updateState();

	}
	// INITIAL FONT SIZE
	initFontsChange() {
		var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
		var initFontSize = window.MICTOOLBOXAPPSTATE.fontSize;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size');
			item.style.fontSize = font;
			var fs = item.style.fontSize.split('px');
		}
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size').split('px');
			var fs = Number(font[0]);
			item.style.fontSize = (fs * initFontSize).toFixed() + 'px';
		}
		if (initFontSize) {
			this.getFontsChanges(initFontSize);
		}
	}
	initFontsChangeFirst() {
		var items = document.querySelectorAll('body,h1,h2,h3,h4,h5,h6,p,a,button,input,textarea,li,td,th,strong,span,blockquote,div');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var font = window.getComputedStyle(item).getPropertyValue('font-size');
			item.style.fontSize = font;
			var fs = item.style.fontSize.split('px');
		}
	}
	getFontsChanges(initFontSize) {
		if (initFontSize > 1) {
			document.getElementById('mic-toolbox-fonts-up').classList.add('vi-font-enabled');
			var initPerc = (Number(initFontSize) * 100 - 100).toFixed();
			var perc = '+' + initPerc + '%';
			document.getElementById('mic-toolbox-fonts-up-enabled').textContent = perc;
		}
		else {
			document.getElementById('mic-toolbox-fonts-up').classList.remove('vi-font-enabled');
			document.getElementById('mic-toolbox-fonts-up-enabled').textContent = '';
		}
	}
	// IMAGES CHANGE
	imagesChange() {

		if (document.body.classList.contains('mic-toolbox-content-images')) {

			var titles = document.querySelectorAll('.mic-toolbox-images-titles');
			for (var i = 0; i < titles.length; i++) {
				var parent = titles[i].parentElement;
				parent.removeChild(titles[i]);
			}
			window.MICTOOLBOXAPPSTATE.imagesTitle = false;
		}

		else {
			this.imagesAddTitles();
			window.MICTOOLBOXAPPSTATE.imagesTitle = true;
		}

	}
	imagesAddTitles() {

		var images = document.images;
		for (var i = 0; i < images.length; i++) {
			var img = images[i];
			if (img.alt) {
				var title = document.createElement('span');
				title.className = 'mic-toolbox-images-titles';
				title.textContent = img.alt;
				img.parentNode.insertBefore(title, img);
			}
			else {
				var title = document.createElement('span');
				title.className = 'mic-toolbox-images-titles';
				title.textContent = 'image without text';
				img.parentNode.insertBefore(title, img);
			}
		}

	}
	updateState() {
		var jsonSting = JSON.stringify(window.MICTOOLBOXAPPSTATE);
		if (typeof (Storage) !== "undefined") {
			localStorage.setItem('MICTOOLBOXAPPSTATE', jsonSting);
		} else {
			console.log('No Storage Found');
		}
	}
	openBox(event) {
		this.toolBox.classList.add('opened-mic-access-tool');
		if (!window.MICTOOLBOXAPPSTATE.initFontSize || window.MICTOOLBOXAPPSTATE.fontSize <= 1) {
			this.initFontsChangeFirst();
			window.MICTOOLBOXAPPSTATE.initFontSize = true;
		}
		this.toolBoxCloseButton.focus();
	}
	closeBox(event) {
		this.toolBox.classList.remove('opened-mic-access-tool');
	}
	openCloseBoxKeyboard(event) {
		if (event.keyCode == 27) {
			this.closeBox();
		}
		if (event.ctrlKey && event.keyCode == 113) {
			this.openBox();
		}
	}
	resetApp(event) {
		localStorage.removeItem('MICTOOLBOXAPPSTATE');
		window.location.reload();
	}
	initialApp() {
		window.MICTOOLBOXAPPSTATE = JSON.parse(localStorage.getItem('MICTOOLBOXAPPSTATE')) || {
			bodyClassList: {},
			fontSize: 1,
			imagesTitle: false,
			keyboardRoot: false,
			initFontSize: false
		};


		// INIT ADDING CLASSES TO BODY
		if (window.MICTOOLBOXAPPSTATE.bodyClassList) {
			for (var bodyClass in window.MICTOOLBOXAPPSTATE.bodyClassList) {
				var initBodyClassList = window.MICTOOLBOXAPPSTATE.bodyClassList[bodyClass];
				var enabledButton = document.getElementById(initBodyClassList);
				if (enabledButton) {
					enabledButton.classList.add('vi-enabled');
				}
				document.body.classList.add(initBodyClassList);
			}
		}

		// FONT SIZE INIT
		if (window.MICTOOLBOXAPPSTATE.fontSize > 1) {
			this.initFontsChange();
		}

		// SET IMAGES TITLES
		if (window.MICTOOLBOXAPPSTATE.imagesTitle) {
			this.imagesAddTitles();
		}

		// SET KEBOARD ROOTING
		if (window.MICTOOLBOXAPPSTATE.keyboardRoot) {
			this.keyboardRootEnable();
		}

		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			var contrastBlock = document.getElementById('mic-toolbox-contrast-block');
			contrastBlock.style.display = 'none';
		}
		if (this.init.link) {
			var initLink = document.getElementById('mic-toolbox-link-nagishut') || {};
			initLink.classList.remove('atb-hide-if-empty');
			initLink.href = this.init.link;
		}
		if (this.init.contact) {
			var initContact = document.getElementById('mic-toolbox-link-contact') || {};
			initContact.classList.remove('atb-hide-if-empty');
			initContact.href = this.init.contact;
		}
		if (this.init.buttonPosition === 'right') {
			document.getElementById('mic-access-tool-general-button').classList.add('mic-access-tool-general-button-right');
			document.getElementById('mic-access-tool-box').classList.add('mic-access-tool-box-right');
		}
	}
}





















// INITIALIZATION APP
window.onload = function() {	
  window.micAccessTool = new MicAccessTool();
};
