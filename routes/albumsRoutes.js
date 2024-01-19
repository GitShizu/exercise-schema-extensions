import express, { query } from 'express';
import Album from '../models/Album.js';

const router = express.Router();
router.use(express.json());

router.get('/', async (req,res)=>{
    try{
        const albums = await Album.find().populate('musician', 'stageName -_id');
        res.send(albums)
    }catch(e){
        res.status(500).send(e.message)
    }
})

router.post('/', async(req,res)=>{
    try{
        const album = await Album.create(req.body).populate('musician', 'stageName -_id')
        res.send(album)
    }catch(e){
        res.status(400).send(e.message)
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const album = await Album.findById(req.params.id).populate('musician', 'stageName -_id')
        await album.duration_minutes()
        res.send(album);
    }catch(e){
        res.status(404).send(e.message)
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const album = await Album.findByIdAndDelete(req.params.id)
        res.send('Album deleted successfully')
    }catch(e){
        res.status(404).send(e.message)
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
            context: 'query'
        }).populate('musician', 'stageName -_id')
        // album.set(req.body) 
        // await album.save()
        res.send(album)
    }catch(e){
        res.status(400).send(e.message)
    }
})

export default router