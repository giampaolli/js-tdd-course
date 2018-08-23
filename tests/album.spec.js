import chai, {expect} from 'chai'
import {getAlbum, getAlbums, getAlbumTracks} from '../src/album'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

global.fetch = require('node-fetch')


describe('Album',() => {
    
    let stubFetch;

    beforeEach(()=> {
        stubFetch = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
        stubFetch.restore()
    });

    describe('Smoke tests', () => {

        it('should have getAlbum method', () => {
            expect(getAlbum).to.exist
        });

        it('should have getAlbumTracks method', () => {
            expect(getAlbumTracks).to.exist
        });
    });

    describe('getAlbum', () => {
        
        it('should call fetch method', () => {
            const album = getAlbum();
            expect(stubFetch).to.have.been.calledOnce
        });

        it('should call fetch with the correct URL', () => {

            const album = getAlbum('3YcBF2ttyueytpXtEzn1Za');
            expect(stubFetch).to.have.been
                .calledWith("https://api.spotify.com/v1/albums/3YcBF2ttyueytpXtEzn1Za");
            
            const album2 = getAlbum('3YcBF2ttyueytpXtEzn1Zy');
            expect(stubFetch).to.have.been
                .calledWith("https://api.spotify.com/v1/albums/3YcBF2ttyueytpXtEzn1Zy");
        });
    });

    describe('getAlbums', () => {
        
        it('should call fetch method', () => {
            const album = getAlbums();
            expect(stubFetch).to.have.been.calledOnce
        });

        it('should call fetch with the correct URL', () => {

            const album = getAlbums(['3YcBF2ttyueytpXtEzn1Za', '3YcBF2ttyueytpXtEzn1Z3']);
            expect(stubFetch).to.have.been
                .calledWith("https://api.spotify.com/v1/albums?ids=3YcBF2ttyueytpXtEzn1Za,3YcBF2ttyueytpXtEzn1Z3");
            
        });
    });

    describe('getAlbumTracks', () => {
        
        it('should call fetch method', () => {
            const album = getAlbumTracks();
            expect(stubFetch).to.have.been.calledOnce
        });

        it('should call fetch with the correct URL', () => {

            const album = getAlbumTracks('3YcBF2ttyueytpXtEzn1Za');
            expect(stubFetch).to.have.been
                .calledWith("https://api.spotify.com/v1/albums/3YcBF2ttyueytpXtEzn1Za/tracks");
            
            const album2 = getAlbumTracks('3YcBF2ttyueytpXtEzn1Zy');
            expect(stubFetch).to.have.been
                .calledWith("https://api.spotify.com/v1/albums/3YcBF2ttyueytpXtEzn1Zy/tracks");
        });
    });

});