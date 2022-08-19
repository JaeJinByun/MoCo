package com.board.board.controller;


import com.board.board.config.LoginUser;
import com.board.board.config.auth.SessionUser;
import com.board.board.dto.BoardDto;
import com.board.board.dto.CommentDto;
import com.board.board.service.board.BoardService;
import com.board.board.service.board.CommentService;
import com.board.board.service.board.LikeService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/* 게시판 */
@AllArgsConstructor
@Controller
@RequestMapping("board") //board 경로로 들어오는 경우 , 그후 해당 필드의 Method로 분기될 수 있도록 설정
public class BoardController {
    private final BoardService boardService;
    private final CommentService commentService;
    private final LikeService likeService;
    private final Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());

    /* ----Board---- */
    /* 게시글 목록
       list 경로로 GET메서드 요청이 들어올 경우 list 메서드와 매핑
       list 경로에 요청 파라미터가 있을 경우 (?page=1), 그에 따른 페이징을 수행 */
    @GetMapping({"","/list"})
    public String list(Model model, @RequestParam(value = "page", defaultValue = "1") Integer pageNum) {
        List<BoardDto.Response> boardList = boardService.getBoardlist(pageNum);
        Integer[] pageList = boardService.getPageList(pageNum);

        model.addAttribute("boardList",boardList);
        model.addAttribute("pageList", pageList);

        return "board/list";
    }

    /* RETURN PAGE */
    @GetMapping("/post")
    public String write(){
        return "board/write";
    }

    /* CREATE */
    @PostMapping("/post")
    public String write(BoardDto.Request boardDto, @LoginUser SessionUser sessionUser) {
        boardService.savePost(sessionUser.getName(),boardDto);
        return "redirect:/board/list";
    }

    /* READ */
    @GetMapping("/post/read/{boardId}")
    public String detail(@PathVariable("boardId") Long boardId, @LoginUser SessionUser sessionUser, Model model, HttpServletRequest request, HttpServletResponse response) {
        BoardDto.Response boardDTO = boardService.findById(boardId);
        List<CommentDto.Response> comments = boardDTO.getComments();

        /* 쿠키 관련 */
        Cookie oldCookie = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("viewCookie")) {
                    oldCookie = cookie;
                }
            }
            if (oldCookie != null) {
                log.info("oldCookie Name : " + oldCookie.getName());
                log.info("oldCookie Value : " + oldCookie.getValue());
                if (!oldCookie.getValue().contains("[" + boardId.toString() + "]")) {
                    boardService.updateView(boardId); /* 조회수++ */
                    oldCookie.setValue(oldCookie.getValue() + "[" + boardId + "]");
                    oldCookie.setPath("/");
                    oldCookie.setMaxAge(60 * 60 * 2); /* 유효시간 */
                    response.addCookie(oldCookie);
                }
            }
        }else {
            Cookie newCookie = new Cookie("viewCookie", "[" + boardId + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 2);
            response.addCookie(newCookie);
            boardService.updateView(boardId); /* 조회수++ */
        }
        /* 좋아요 관련 */
        if(likeService.findLike(sessionUser.getName(), boardId)){
            model.addAttribute("isLiked",true);
        }else {
            model.addAttribute("isLiked", false);
        }


        /* 댓글 리스트 */
        if(comments != null && !comments.isEmpty()) {
            model.addAttribute("comments",comments);
        }

        /* 사용자 관련 */
        if(sessionUser != null){
            /* 게시글 작성자 본인인지 확인 */
            if(boardDTO.getUserId() == sessionUser.getId()) {
                model.addAttribute("iswriter",true);
            }

            /* 댓글 작성자 본인인지 확인 */
            for (int i = 0; i < comments.size(); i++) {
                //댓글 작성자 id와 현재 사용자 id를 비교
                boolean iswriterComment = comments.get(i).getUserId().equals(sessionUser.getId());
                model.addAttribute("iswriterComment", iswriterComment);
            }
        }
        model.addAttribute("boardDto",boardDTO);
        return "board/detail";
    }

    /* RETURN PAGE */
    @GetMapping("post/edit/{no}")
    public String edit(@PathVariable("no") Long no, Model model) {
        BoardDto.Response boardDTO = boardService.getPost(no);

        model.addAttribute("boardDto",boardDTO);
        return "board/update";
    }

    /* UPDATE */
    @PutMapping("/post/edit/{no}")
    public String update(BoardDto.Request boardDto, @LoginUser SessionUser sessionUser) {
        boardService.savePost(sessionUser.getName(),boardDto);

        return "redirect:/board/list";
    }

    /* DELETE */
    @DeleteMapping("/post/{no}")
    public String delete(@PathVariable("no") Long no) {
        boardService.deletePost(no);
        return "redirect:/board/list";
    }

    /*
    검색
    keyword를 view로 부터 전달 받고
    Service로 부터 받은 boardDtoList를 model의 attribute로 전달해준다. */
    @GetMapping("/search")
    public String search(@RequestParam(value = "keyword") String keyword, Model model) {
        List<BoardDto.Response> boardDtoList = boardService.searchPosts(keyword);
        System.out.println(keyword);
        model.addAttribute("boardList", boardDtoList);
        return "board/list";
    }


    /* ----Comment---- */

    /* CREATE */
    @PostMapping("/comment/{id}")
    public ResponseEntity commentSave(@PathVariable Long id, @RequestBody CommentDto.Request commentDto, @LoginUser SessionUser sessionUser) {
        return ResponseEntity.ok(commentService.commentSave(sessionUser.getName(), id, commentDto));
    }

    /* UPDATE */
    @PutMapping("/post/{boardId}/comment/{commentId}")
    public ResponseEntity commentUpdate(@PathVariable Long commentId, @RequestBody CommentDto.Request commentDto) {
        commentService.commentUpdate(commentId, commentDto);
        return ResponseEntity.ok(commentId);
    }

    /* DELETE */
    @DeleteMapping("/post/{boardId}/comment/{commentId}")
    public ResponseEntity commentDelete(@PathVariable Long commentId) {
        commentService.commentDelete(commentId);
        return ResponseEntity.ok(commentId);
    }

    /* ----Likes---- */

    /* CREATE */
    @PostMapping("/post/{boardId}/like")
    public ResponseEntity likeSave(@PathVariable Long boardId, @LoginUser SessionUser sessionUser) {
        return ResponseEntity.ok(likeService.likeSave(sessionUser.getName(),boardId));
    }

    /* DELETE */
    @DeleteMapping("/post/{boardId}/like")
    public ResponseEntity deleteLike(@PathVariable Long boardId, @LoginUser SessionUser sessionUser) {
        return ResponseEntity.ok(likeService.deleteLike(sessionUser.getName(), boardId));
    }
}










