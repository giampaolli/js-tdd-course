import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/main'

describe('Spotify wrapper', () => {

  describe('Smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic search', () => {

    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
    })

    afterEach(() => {
      fetchedStub.restore();
    })

    it('should call fetch function', () => {

      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should recive correct URl to fetch', () => {
      
      context('passing one type', () => {
 
        const artists = search('incubus', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist');

        const albums = search('incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=album')

      });

      context('passing more than one type', () => {
 
        const artistsAndAlbus = search('incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist,album');

      });

    });

  });

});