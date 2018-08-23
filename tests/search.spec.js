import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { API_URL } from '../src/config'

chai.use(sinonChai)

global.fetch = require('node-fetch')

import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../src/search'

describe('Spotify wrapper', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.resolves({ json: () => {} });
  })

  afterEach(() => {
    fetchedStub.restore();
  })

  describe('Smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
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

    it('should call fetch function', () => {

      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should recive correct URl to fetch', () => {
      
      context('passing one type', () => {
 
        const artists = search('incubus', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=incubus&type=artist`);

        const albums = search('incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=incubus&type=album`)

      });

      context('passing more than one type', () => {
 
        const artistsAndAlbus = search('incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=incubus&type=artist,album`);

      });

    });

  });

  describe('searchArtists', () => {

    it('should call fetch function', () => {

      const artists = searchArtists('incubus');
      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should recive correct URl to fetch', () => {
    
      const artists = searchArtists('incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=artist`);

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=artist`);

      });

  })

  describe('searchAlbums', () => {

    it('should call fetch function', () => {

      const artists = searchAlbums('incubus');
      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should recive correct URl to fetch', () => {
    
      const albums = searchAlbums('incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=album`);

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=album`);

      });

  })

  describe('searchTracks', () => {

    it('should call fetch function', () => {

      const tracks = searchTracks('incubus');
      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should recive correct URl to fetch', () => {
    
      const tracks = searchTracks('incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=track`);

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=track`);

      });

  })

  describe('searchPlaylists', () => {

    it('should call fetch function', () => {

      const playlists = searchPlaylists('incubus');
      expect(fetchedStub).to.have.been.calledOnce;

    });

    it('should recive correct URl to fetch', () => {
    
      const playlists = searchPlaylists('incubus');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=playlist`);

      const playlists2 = searchPlaylists('Muse');
      expect(fetchedStub).to.have.been
        .calledWith(`${API_URL}/search?q=incubus&type=playlist`);

      });

  })

});