package entites;

import java.util.List;

import javax.persistence.*;

@Entity
public class MusicalGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idGenre")
    @SequenceGenerator(name = "idGenre", sequenceName = "idGenre")
    private Long idGenre;

    private String name;

    private String description;
	
  @OneToMany(mappedBy="genre", orphanRemoval = true,fetch=FetchType.EAGER)
	private List<Song> songs;

    public Long getIdGenre() {
        return idGenre;
    }

    public void setIdGenre(Long idGenre) {
        this.idGenre = idGenre;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
  public List<Song> getSongs() {
        return songs;
    }
    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }
   
	
 
}
