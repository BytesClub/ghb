'use strict';

var viewIssue = (issueFd) => {
	if (issueFd.trim() === ''){
		let err = `No Git issue found! You may fetch again for latest updates.`
		throw err;
	}
	let issues = JSON.parse(issueFd)
	if (typeof issues === 'undefined' || (Object.keys(issues).length === 0 && issues. constructor === Object)){
		let err = `Fatal Error: No Git issue found in local data!\n\nUse ${argv[index]} fetch issue to get the latest.`
		throw err;
	}
	issues.forEach((val, index, arr) => {
		// Title and Issue Number in Yellow fg
		console.log('\x1b[33m%s #%s\x1b[0m', val.title, val.number)
		// Body of issue in White fg
		console.log('\x1b[37m%s\x1b[0m', val.body)
		val.labels.forEach((label) => {
			// Labels associated are in Red bg and White fg
			console.log('\x1b[41m\x1b[37m%s\x1b[0m', label.name)
		})
		// User-ID of creator in Cyan fg
		console.log('\x1b[36mCreated by: %s\x1b[0m', val.user.login)
		if (val.assignee){
			// Assignee list in Green fg
			console.log('\x1b[32mAssigned to:')
			val.assignees.forEach((as) => {
				console.log('* %s', as.login)
			})
		}
		// Reset to default
		console.log('\x1b[0m')
	})
	return true
}

module.exports = viewIssue