package entites;

import javax.persistence.*;

@Entity
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idSong")
    @SequenceGenerator(name = "idSong", sequenceName = "idSong")
    private Long idSong;

    private String name;

    private String description;

    private String youtubeUrl;

    @ManyToOne
	@JoinColumn(name="idGenre",referencedColumnName="idGenre")
	private MusicalGenre genre;
    
    
    public Long getIdSong() {
        return idSong;
    }

    public void setIdSong(Long idSong) {
        this.idSong = idSong;
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

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String link) {
        this.youtubeUrl = link;
    }
    public MusicalGenre getMusicalGenre() {
		return null;
	}

	public void setMusicalGenre(MusicalGenre genre) {
		this.genre = genre;
	}

}
