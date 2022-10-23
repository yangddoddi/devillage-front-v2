import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Reply.module.scss";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useRef } from "react";
import { useState } from "react";

export const Reply = ({ children }) => {
  return (
    <div className={styles.replyItem}>
      <div className={styles.replyTop}>
        <div className={styles.replyTopLeft}>
          <UserOutlined className={styles.replyAvatar} />
          <div className={styles.profileRight}>
            <p className={styles.author}>솔직한사람</p>
            <span>2022.09.07</span> · <span>수정</span> · <span>삭제</span> ·{" "}
            <span>답글</span>
          </div>
        </div>
        <div className={styles.replyTopRight}>
          <LikeOutlined className={styles.replyLikeBtn} />
          <div className={styles.replyLike}>13</div>
        </div>
      </div>
      <div className={styles.replyContent}>
        <p>대박 X신인 것 같긴 하네욤..</p>
      </div>
      <div className={styles.replyOfCommentContainer}>{children}</div>
      <div className={styles.commentWriteContainer}>
        <h2>댓글 작성</h2>
        <div className={styles.commentWrite}>
          <Editor
            previewStyle="vertical"
            initialEditType="wysiwyg"
            initialValue="<p>커뮤니티 이용 매너를 지켜주세요 :)</p>"
            useCommandShortcut={false}
            onChange={onChangeEditor}
            plugins={[colorPlugin]}
            language="ko=KR"
            ref={editorRef}
            className={styles.editor}
          />
          <button className={styles.commentBtn}>댓글 작성</button>
        </div>
      </div>
    </div>
  );
};
