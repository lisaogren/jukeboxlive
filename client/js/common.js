/*
 * Log function
 */
(function(window, $) {


// Log information to available console
var log = function(msg, type) {
	type = type || "log";

	if (typeof type == 'number') {
		if (type > log.level) { return; }
		type = log.levels[type - 1] || "log";
	} else if (log.level < log[type.toUpperCase()]) { 
		return; 
	}

    // Retrieve current date
    var date = new Date();
    msg = "[" + date.format("isoDate") + " " + date.format("isoTime") + "] [" + type.toUpperCase() + "] " + msg;

    // Log message to available console
    if(window.console){

    	if(console[type]) {

    		if(console[type].call) console[type].call(console, msg);
    		else console[type](msg);

    	}else if (console.log) {

    		if(console.log.call) console.log.call(console, msg);
    		else console.log(msg);

    	}

    }else if(window.opera && opera.postError) {
    	
    	if(opera.postError.call) opera.postError.call(opera, msg);
    	else opera.postError(msg);
    	
    }
	
	/*
    try {console[type].call(console, msg);}
    catch (e) {
    	try { console.log.call(console, msg); }
    	catch (e) {
    		try {opera.postError.call(opera, msg);}
	        catch (e) {}
	//        catch (e) {alert(Array.prototype.join.call(arguments, " "));}
    	}
    }
    */
};

log.levels = ['error', 'warn', 'info', 'debug'];

log.ERROR = 1;
log.WARN = 2;
log.INFO = 3;
log.LOG = 3;
log.DEBUG = 4;

log.level = log.DEBUG;

/**
 * return the object in consol log
 * @author Diono
 * @param  {object} obj the object that it will returned
 * @return {log}     the object
 */
log.obj = function(obj) {

	if (obj instanceof Array){

		for(var i = 0, obj_length = obj.length; i < obj_length; i++) log.obj(obj[i]);

	}else{

		if(window.console) console.log(obj);
		else if (window.opera && opera.postError && JSON) opera.postError(JSON.stringify(obj));
	}

}

window.log = log;






String.prototype.ucfirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};



String.prototype.nl2br = function(is_xhtml) {
    // Converts newlines to HTML line breaks  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/nl2br
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Atli Þór
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Maximusya
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin\nvan\nZonneveld'
    // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
    // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
    // *     returns 3: '\nOne\nTwo\n\nThree\n'
    // var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '' : '<br>';
    //console.log(breakTag);
 
    return (this + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
};


/**
 * String.prototype.encodeHTML
 * -----------------------
 * HTML encoding is simply replacing &, ", < and > chars with their entity equivalents. Order matters, if you don't replace the & chars first, you'll double encode some of the entities:
 *
 * @author Diono (by Johan B.W.)
 * 
 */
String.prototype.encodeHTML = function () {
	return this.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
};

/**
 * String.prototype.decodeHTML
 * -----------------------
 * Conversely if you want to decode HTML entities[1], make sure you decode &amp; to & after everything else so that you don't double decode any entities:
 *
 * @author Diono (by Johan B.W.)
 * 
 */
String.prototype.decodeHTML = function () {
	return this.replace(/&quot;/g, '"')
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<')
		.replace(/&amp;/g, '&');
};









/* 
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */


var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};
		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "dddd d mmmm yyyy @ HH:MM",
	shortDateEn:      "mm/dd/yy",
	shortDateFr:      "dd/mm/yyyy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	time: 			"HH:MM",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam",
		"Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
	],
	monthNames: [
		"Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec",
		"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

Date.prototype.addMinutes = function(m) {
	this.setMinutes(this.getMinutes() + m);
	return this;
}

Date.prototype.addSeconds = function(s) {
	this.setSeconds(this.getSeconds() + s);
	return this;
}



















/**
 * jQuery dataTables internationalization
 * --------------------------------------
 * This defines labels to be used by the datatables
 *
 */
var dtoLanguage = window.dtoLanguage = {
	fr: {
		oPaginate: {
			sFirst: '&laquo;',
			sLast: '&raquo;',
			sNext: '&gt;',
			sPrevious: '&lt;'
		},
		sInfo: '_START_ / _END_ (Total: _TOTAL_)',
		sInfoEmpty: 'Aucune entr&eacute;e disponible',
		sInfoFiltered: ' - filtr&eacute; &agrave; partir de _MAX_ entr&eacute;e',
		sLengthMenu: 'Afficher _MENU_ entr&eacute;es',
		sProcessing: 'Les donn&eacute;es sont en cours de chargement',
		sSearch: 'Rechercher :',
		sZeroRecords: "Il n'y a aucune entr&eacute;e disponible"
	}
};




/**
 * method to compare two jQuery selections
 * @param  {Array} compareTo The jQuery selection that we need this selection to be compared to
 * @return {Boolean}           true if the two sets are equal else false
 */
$.fn.equals = function(compareTo) {
	if (!compareTo || this.length != compareTo.length) {
		return false;
	}
	for (var i = 0; i < this.length; ++i) {
		if (this[i] !== compareTo[i]) {
			return false;
		}
	}
	return true;
};



/**
 * Check if an element has a scrollbar
 * @return {Boolean} true if scroll is visible else false
 */
$.fn.hasScrollBar = function(orientation) {
	orientation = orientation || 'vertical';
    return this.get(0)[orientation == 'vertical' ? 'scrollHeight' : 'scrollWidth'] > this[orientation == 'vertical' ? 'innerHeight' : 'innerWidth']();
}


})(window, jQuery);