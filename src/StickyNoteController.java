@RestController
@RequestMapping("/api")
public class StickyNoteController {

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private CommentRepository commentRepo;

    @PostMapping("/like/{noteId}")
    public ResponseEntity<?> likeNote(@PathVariable Long noteId) {
        noteRepo.incrementLike(noteId); // 実装はRepository側
        return ResponseEntity.ok().build();
    }

    @GetMapping("/notes")
    public List<StickyNote> getAllNotes() {
        return noteRepo.findAll();
    }

    @GetMapping("/comments/{noteId}")
    public List<Comment> getComments(@PathVariable Long noteId) {
        return commentRepo.findByNoteId(noteId);
    }

    @PostMapping("/comments/{noteId}")
    public ResponseEntity<?> addComment(@PathVariable Long noteId, @RequestBody Comment comment) {
        comment.setNoteId(noteId);
        commentRepo.save(comment);
        return ResponseEntity.ok().build();
    }
}