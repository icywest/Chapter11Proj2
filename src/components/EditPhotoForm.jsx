// src/components/EditPhotoForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { THUMB_BASE_URL } from "../api";

const Panel = styled.section`
  border: 1px solid #eee;
  border-radius: 16px;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
`;

const Title = styled.h2`
  margin: 0 0 .75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1d1d1f;
`;

const Preview = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.9rem;
  background: #fafafa;
  aspect-ratio: 16/9;
  display: grid;
  place-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #8e8e93;
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: grid;
  gap: .75rem;
`;

const Row = styled.div`
  display: grid;
  gap: .35rem;

  @media (min-width: 720px) {
    grid-template-columns: 140px 1fr;
    align-items: center;
  }
`;

const Label = styled.label`
  font-size: 0.85rem;
  color: #666;
`;

const Input = styled.input`
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: .6rem .75rem;
  font-size: .95rem;
  outline: none;
  background: #fff;
  transition: box-shadow .15s ease, border-color .15s ease;

  &:focus {
    border-color: #c7c7cc;
    box-shadow: 0 0 0 4px rgba(0,122,255,0.12);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: .5rem;
  justify-content: flex-end;
  margin-top: .25rem;
`;

const Button = styled.button`
  border-radius: 12px;
  padding: .6rem .9rem;
  font-weight: 600;
  font-size: .95rem;
  cursor: pointer;
  transition: transform .04s ease, box-shadow .15s ease, background .15s;

  &:active { transform: translateY(1px); }
  &:disabled { opacity: .55; cursor: not-allowed; transform: none; }
`;

const Primary = styled(Button)`
  background: #007aff;
  color: #fff;
  border: 1px solid #007aff;
  box-shadow: 0 6px 16px rgba(0,122,255,0.22);

  &:hover:not(:disabled) { background: #0062cc; border-color: #0062cc; }
`;

const Ghost = styled(Button)`
  background: #fff;
  color: #1d1d1f;
  border: 1px solid #e6e6e6;

  &:hover { background: #f6f6f7; }
`;

const Hint = styled.p`
  margin: .25rem 0 0;
  font-size: .8rem;
  color: #8e8e93;
`;

function deriveFormFromPhoto(photo) {
  if (!photo) return { id: "", title: "", city: "", country: "", filename: "" };
  const city = photo.city ?? photo.location?.city ?? "";
  const country = photo.country ?? photo.location?.country ?? "";
  return {
    id: photo.id ?? photo.filename ?? "",
    title: photo.title ?? "",
    city,
    country,
    filename: photo.filename ?? "",
  };
}

export default function EditPhotoForm({ photo, onSave, onCancel }) {
  const [form, setForm] = useState(() => deriveFormFromPhoto(photo));

  useEffect(() => {
    setForm(deriveFormFromPhoto(photo));
  }, [photo]);

  const isDirty = useMemo(() => {
    if (!photo) return false;
    const baseline = deriveFormFromPhoto(photo);
    return ["title", "city", "country", "filename"].some(k => baseline[k] !== form[k]);
  }, [photo, form]);

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

   const submit = (e) => {
  e.preventDefault();
  console.log("sent from EditPhotoForm:", form);
  onSave?.(form);
};

  if (!photo) return <p className="status">Select a photo to edit.</p>;

  const src = form.filename ? `${THUMB_BASE_URL}${form.filename}` : undefined;

  return (
    <Panel className="edit-form">
      <Title>Edit Photo</Title>

      <Preview>
        {src ? (
          <Img src={src} alt={form.title || "Selected photo"} loading="lazy" />
        ) : (
          <Placeholder>No preview</Placeholder>
        )}
      </Preview>

      <Form onSubmit={submit}>
        <Row>
          <Label htmlFor="title">Title</Label>
          <div>
            <Input id="title" value={form.title} onChange={update("title")} placeholder="e.g., Albert Hall" />
          </div>
        </Row>

        <Row>
          <Label htmlFor="city">City</Label>
          <div>
            <Input id="city" value={form.city} onChange={update("city")} placeholder="e.g., London" />
          </div>
        </Row>

        <Row>
          <Label htmlFor="country">Country</Label>
          <div>
            <Input id="country" value={form.country} onChange={update("country")} placeholder="e.g., United Kingdom" />
          </div>
        </Row>

        <Row>
          <Label htmlFor="filename">Filename</Label>
          <div>
            <Input id="filename" value={form.filename} onChange={update("filename")} placeholder="5855174537.jpg" />
            <Hint>Preview uses the thumbnail path + this filename.</Hint>
          </div>
        </Row>

        <Actions>
          <Ghost type="button" onClick={onCancel}>Cancel</Ghost>
          <Primary type="submit" disabled={!isDirty || !form.filename}>Save</Primary>
        </Actions>
      </Form>
    </Panel>
  );
}
