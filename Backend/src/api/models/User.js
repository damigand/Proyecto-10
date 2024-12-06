const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		usuario: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: false },
		eventosCreados: [{ type: mongoose.Types.ObjectId, ref: 'events' }],
	},
	{
		timestamps: true,
		collection: 'users',
	}
);

userSchema.pre('save', function () {
	this.password = bcrypt.hashSync(this.password, 12);
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;
