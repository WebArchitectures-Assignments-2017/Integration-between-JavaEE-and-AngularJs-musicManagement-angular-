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
@Path("genres")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MusicalGenreResource extends Application {
    @PersistenceContext
    private EntityManager entityManager;



    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public  List<MusicalGenre> listMusicalGenres() {
        Query query =entityManager.createQuery("SELECT m FROM MusicalGenre m");
        
        return query.getResultList();
    }


    @GET
    @Path("{id}")
    public MusicalGenre getMusicalGenre(@PathParam("id") Long id) {
        return entityManager.find(MusicalGenre.class, id);
    }

    @POST
    public MusicalGenre saveMusicalGenre(MusicalGenre genre) {
        if (genre.getIdGenre() == null) {
        	MusicalGenre genreToSave = new MusicalGenre();
            genreToSave.setName(genre.getName());
            genreToSave.setDescription(genre.getDescription());
            entityManager.persist(genre);
        } else {
        	MusicalGenre genreToUpdate = getMusicalGenre(genre.getIdGenre());
            genreToUpdate.setName(genre.getName());
            genreToUpdate.setDescription(genre.getDescription());
            genre = entityManager.merge(genreToUpdate);
        }

        return genre;
    }

    @DELETE
    @Path("{id}")
    public void deleteMusicalGenre(@PathParam("id") Long id) {
        entityManager.remove(getMusicalGenre(id));
    }
}
