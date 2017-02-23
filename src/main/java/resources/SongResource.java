package resources;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import entites.MusicalGenre;
import entites.Song;

import java.util.List;

@Stateless
@ApplicationPath("/resources")
@Path("songs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class SongResource extends Application {
    @PersistenceContext
    private EntityManager entityManager;

 
    public MusicalGenre getMusicalGenreById(long musicalGenreId) {
		
		MusicalGenre mg = entityManager.find(MusicalGenre.class, musicalGenreId);
		return mg;
	}
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Song> listSongs() {
        Query query =
                entityManager.createQuery("SELECT s FROM Song s");
        
        return query.getResultList();
    }

    
    @GET
    @Path("{id}")
    public Song getSong(@PathParam("id") Long id) {
        return entityManager.find(Song.class, id);
    }
    

    @POST
    @Path("{idGenre}")
    public Song saveSong(@PathParam("idGenre")Long idGenre,Song song) {
        if (song.getIdSong() == null) {
            Song songToSave = new Song();
            songToSave.setName(song.getName());
            songToSave.setDescription(song.getDescription());
            songToSave.setYoutubeUrl(song.getYoutubeUrl());
           MusicalGenre genre= getMusicalGenreById(idGenre);
            songToSave.setMusicalGenre(genre);
            entityManager.persist(songToSave);
        } else {
            Song songToUpdate = getSong(song.getIdSong());
            songToUpdate.setName(song.getName());
            songToUpdate.setDescription(song.getDescription());
            songToUpdate.setYoutubeUrl(song.getYoutubeUrl());
            MusicalGenre genre= getMusicalGenreById(idGenre);
            songToUpdate.setMusicalGenre(genre);
            song = entityManager.merge(songToUpdate);
        }

        return song;
    }

    @DELETE
    @Path("{id}")
    public Song deleteSong(@PathParam("id") Long id) {
    	Song s= getSong(id);
    	entityManager.remove(entityManager.merge(s));
        return getSong(id);
    }
}
