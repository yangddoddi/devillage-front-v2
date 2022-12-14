import React from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { Location } from "react-router-dom";
import styles from "./PostView.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import { BookOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { Reply } from "./Reply";
import { ReplyOfComment } from "./ReplyOfComment";

export const PostView = () => {
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);
  const [bookMark, setBookMark] = useState(false);

  const param = new URLSearchParams(window.location.search);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickLikeBtnHandler = () => {
    axios
      .post(`http://localhost:8080/posts/${id}/like`)
      .then((res) => {
        console.log(res);
        setLike(!like);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickBookmarkHandler = () => {
    axios
      .post(`http://localhost:8080/posts/${id}/bookmark`)
      .then((res) => {
        console.log(res);
        setBookMark(!bookMark);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   axios
  //     .get(`http://localhost:8080/posts/${id}`)
  //     .then((res) => {
  //       setPost(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  return (
    <>
      {/* <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.tag}>{post.tag}</div>
      <Viewer initialValue={post.content} /> */}
      <div className={styles.container}>
        <div className={styles.postContainer}>
          <div className={styles.topContainer}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>
                ?????? ?????? ??? ?????? ????????????? ??? ???
              </h2>
            </div>
            <div className={styles.profile}>
              <div className={styles.profileLeft}>
                <UserOutlined className={styles.avatar} />
              </div>
              <div className={styles.profileRight}>
                <p className={styles.author}>X???</p>
                <span>2022.09.07</span> ?? <EyeOutlined />
                <span>127</span> ?? <span>?????????</span>
              </div>
              <BookOutlined
                className={styles.bookMark}
                onClick={onClickBookmarkHandler}
              />
            </div>
          </div>
          <div className={styles.contentContainer}>
            <Viewer
              initialValue={
                "<p>??? ???????????? ?????? ?????? ??? ???</p><p>??? ?????? ?????? ????</p><p>????????? ?????? ?????? ??? ?????? ?????? ????????? html??? css?????????</p>"
              }
              bor
            />
            <div className={styles.contentBottomContainer}>
              <div className={styles.tagContainer}>
                <span className={styles.tag}>#??????</span>
                <span className={styles.tag}>#??????</span>
                <span className={styles.tag}>#?????????</span>
              </div>
              <div className={styles.btnContainer}>
                <LikeOutlined
                  className={styles.likeBtn}
                  onClick={onClickLikeBtnHandler}
                />
                <div className={styles.like}>13</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.replyContainer}>
          <Reply>
            <ReplyOfComment />
          </Reply>
          {/* <div className={styles.replyTitle}>??????</div>
          <div className={styles.replyItem}>
            <div className={styles.replyTop}>
              <div className={styles.replyTopLeft}>
                <UserOutlined className={styles.replyAvatar} />
                <div className={styles.profileRight}>
                  <p className={styles.author}>???????????????</p>
                  <span>2022.09.07</span> ?? <span>??????</span> ??{" "}
                  <span>??????</span>
                </div>
              </div>
              <div className={styles.replyTopRight}>
                <LikeOutlined className={styles.replyLikeBtn} />
                <div className={styles.replyLike}>13</div>
              </div>
            </div>
            <div className={styles.replyContent}>
              <p>?????? X?????? ??? ?????? ?????????..</p>
            </div>
            <div className={styles.replyOfCommentContainer}>
              <div className={styles.replyOfComment}>
                <div className={styles.replyOfCommentTop}>
                  <div className={styles.replyOfCommentTopLeft}>
                    <div className={styles.profileRight}>
                      <p className={styles.author}>????????????</p>
                      <span>2022.09.07</span> ?? <span>??????</span> ??{" "}
                      <span>??????</span>
                    </div>
                  </div>
                </div>
                <div className={styles.replyOfCommentBottom}>
                  <p>????????? ?????? ??? ?????? ??? ?????????..</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
