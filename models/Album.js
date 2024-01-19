import { SchemaTypes, model, Schema } from "mongoose";

const albumSchema = new Schema({
    musician: {
        type: SchemaTypes.ObjectId,
        ref: 'Musician'
    },
    duration_seconds: Number,
    title: String
})

const Album = model('Album', albumSchema);

albumSchema.virtual('duration_minutes')
.get(function(){
    return this.duration_seconds/60
})
.set(function(minutes){
    this.duration_minutes = minutes
    this.save()
})


export default Album;
