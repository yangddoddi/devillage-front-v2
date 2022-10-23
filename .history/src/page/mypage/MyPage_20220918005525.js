import styles from "./MyPage.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRefreshToken } from "../../store/Storage";
import { Logout } from "../logout/Logout";

export const MyPage = () => {
  const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navi = useNavigate();

  const refreshToken = getRefreshToken();

  const onClickHandler = async () => {
    const result = await deleteToken(refreshToken);
    if (result.status === 200) {
      removeRefreshToken();
      dispatch(removeToken());
      navi("/");
    } else {
      alert("로그아웃 실패");
    }
  };

  return (
    <div className={styles.myPage}>
      <ul className={styles.myPageList}>
        <li>마이페이지</li>
        <li>북마크</li>
        <li>글쓰기</li>
        <li className={styles.logout} onClick={onClickHandler}>
          로그아웃
        </li>
      </ul>
    </div>
  );
};
