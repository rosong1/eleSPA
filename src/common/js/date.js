export function formatTime(time) { // yyyy-MM-DD hh:mm
  			let d = new Date();
	  		d.setTime(time);
	  		let YYYY = d.getFullYear();
	  		let MM = d.getMonth() > 9 ? d.getMonth() : ('0' + d.getMonth());
	  		let DD = d.getDate() > 9 ? d.getDate() : ('0' + d.getDate());
	  		let hh = d.getHours() > 9 ? d.getHours() : ('0' + d.getHours());
	  		let mm = d.getMinutes() > 9 ? d.getMinutes() : ('0' + d.getMinutes());
  			return `${YYYY}-${MM}-${DD} ${hh}:${mm}`;
};
