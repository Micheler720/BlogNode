const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const objectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    photo: String,
    title:{
        type:String,
        trim:true, // tira espaçoes excedentes do inici e do fim
        required: 'Nâo é permitido Post sem titulo.',
    },
    slug:String,
    body:{
        type:String,
        trim:true
    },
    tags:[String],
    autor: {
        type: objectId,
        ref: 'Users'
    }
});

postSchema.pre('save' , async function(next){
    if(this.isModified('title')){
        this.slug = slug(this.title, {lower: true});
    }

    const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, `i`);

    const postsWithSlug = await this.constructor.find({slug:slugRegex})

    if(postsWithSlug.length > 0){
        this.slug = `${this.slug}-${postsWithSlug.length + 1}`;
    }
    
    next();
});

postSchema.statics.getTagsList = function(){
    return this.aggregate([
        { $unwind: '$tags' },
        { $group: {_id:'$tags' , count:{ $sum:1 } } },
        {$sort:{ count: -1}}
    ]);
};

postSchema.statics.findPosts = function(filters = {}){
    return this.find(filters).populate('autor');
    /*return this.aggregate([
        {$match: filters},
        {$lookup:{
            from: 'users',
            let: {'autor': '$autor' },
            pipeline:[
                {$match: { $expr: { eq:[ '$$autor', '$_id']}}},
                { $limit: 1 }
            ],
            as: 'autor'
        } },
        {$addFields:{
            'autor': { $arrayElemAt: ['$autor', 0 ]}
        }  }
    ]);*/

};
module.exports = mongoose.model('Post' , postSchema );
