import React from 'react';
import styled from 'styled-components';
import { MdImage, MdSave } from 'react-icons/md';
import Select from 'react-select';
import { ICategory } from '../../../types/post/ICategory';
import colors from '../../../style/colors';


type WriteHeaderProps = {
  title: string;
  category: string;
  categories: ICategory[];
  upsertPost: () => void;
  onImageUpload: () => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategories: (selectedCategory: ICategory) => void;
}

function WriteHeader({
                       title,
                       category,
                       categories,
                       upsertPost,
                       onImageUpload,
                       onChangeTitle,
                       onChangeCategories,
                     }: WriteHeaderProps) {

  return (
    <S.WriteHeader >
      <S.WriteHeaderLeft >
        <input type='text'
               value={title}
               placeholder='제목을 입력해 주세요.'
               onChange={onChangeTitle}
        />
      </S.WriteHeaderLeft>
      <S.WriteHeaderRight>
        <S.WriteHeaderSelect>
          <Select
            value={category}
            onChange={onChangeCategories}
            options={categories}
          />
        </S.WriteHeaderSelect>
        <S.WriteHeaderButton onClick={onImageUpload}>
          <MdImage/>
          <span>업로드</span>
        </S.WriteHeaderButton>
        <S.WriteHeaderButton onClick={upsertPost}>
          <MdSave/>
          <span>작성하기</span>
        </S.WriteHeaderButton>
      </S.WriteHeaderRight>
    </S.WriteHeader>
  );
};

WriteHeader.defaultProps = {
  title: '',
  category: '',
  categories: [],
} as WriteHeaderProps;

export default WriteHeader;

const S: any = {};

S.WriteHeader = styled.div`
  display: flex;
  width: 100%;
`;

S.WriteHeaderLeft = styled.div`
  flex: 1 1;
  background-color: #56b6c2;
  margin: 1rem 0 1rem 2rem;

  input {
    width: 100%;
    height: 100%;
    border: none;
    color: ${colors.mainThemeColor};
    outline-style: none;
    font-size: 2.4rem;
  }
`;

S.WriteHeaderRight = styled.div`
  height: 100%;
  display: flex;
  margin-right: 2rem;
  align-items: center;
`;

S.WriteHeaderSelect = styled.div`
  width: 15rem;
  margin: 0 2rem;
`;

S.WriteHeaderButton = styled.div`
  display: flex;
  font-size: 3rem;
  font-weight: 600;
  height: 100%;
  width: 10rem;
  cursor: pointer;
  color: ${colors.mainThemeColor};
  align-items: center;

  span {
    font-size: 1.6rem;
    margin: .15rem 0 0 .5rem;
  }
`;
