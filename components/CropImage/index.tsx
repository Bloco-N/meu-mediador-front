import React, { useEffect, useState,forwardRef, useImperativeHandle } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal } from '@components/index';
import styled from 'styled-components';

type Props = {
  src: File | string;
  onCrop: (file: File) => void;
};

export const CropImage: React.FC<any> = forwardRef(({ src, onCrop },ref:any) => {
  const [cropper, setCropper] = useState<Cropper>();
  const [source, setSource] = useState<string | undefined>();
  const [isVisible, setIsVisible] = useState<boolean>(false);


  useEffect(() => {
    if (src instanceof File) {
      setSource(URL.createObjectURL(src));
    } else if (typeof src === 'string') {
      setSource(src);
    }
  }, [isVisible]);

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsVisible(true)
      },
      close() {
        setIsVisible(false)
      },
    };
  }, []);


  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "newAvatar.png", { type: "image/png" });
        });
      if (file) {
        onCrop(file);
        setSource("")
        setIsVisible(false)
      }
    }
  };

  return (
    <Modal onClose={() => {}} isOpen={isVisible} childSize={{ width: '65vh', height: '10vh', radius: 0 }}>
      <StyledCropperWrapper>
        <Cropper
          src={source}
          initialAspectRatio={4 / 3}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          guides={false}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
        <StyledButton onClick={getCropData}>
          Cortar
        </StyledButton>
      </StyledCropperWrapper>
    </Modal>
  );
});

const StyledCropperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
