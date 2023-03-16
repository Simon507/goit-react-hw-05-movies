import styled from 'styled-components';

export const ReviewList = styled.ul`
  padding: 15px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ReviewItem = styled.li`
  padding: 10px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  display: flex;
  gap: 15px;
  justify-content: center;
  width: 100%;
`;

export const Author = styled.div`
  width: 60px;
  height: 90px;
`;

export const ReviewAvatar = styled.img``;

export const ReviewTxt = styled.p`
  /* display: flex;
  flex-direction: column; */
  width: 85%;
`;

export const DatesInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
