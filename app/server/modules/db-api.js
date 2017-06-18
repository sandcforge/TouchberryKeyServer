exports.getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

exports.findById = function(db, id, callback)
{
	db.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

exports.findByMultipleFields = function(db, a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	db.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}
