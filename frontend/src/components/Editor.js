import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Container, Typography, Button, Box } from '@mui/material';

const ItemType = 'SECTION';

const DraggableSection = ({ section, index, moveSection, updateContent }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveSection(draggedItem.index, index);
                draggedItem.index = index;
            }
        }
    });

    return (
        <Box
            ref={(node) => dragRef(dropRef(node))}
            sx={{
                p: 2,
                mb: 2,
                border: '2px dashed #ccc',
                backgroundColor: isDragging ? '#f0f0f0' : '#fff'
            }}
        >
            <Typography variant="h6">{section.name}</Typography>
            {section.type === 'text' && (
                <textarea
                    value={section.content}
                    onChange={(e) => updateContent(index, e.target.value)}
                    style={{ width: '100%', height: '80px', marginTop: '8px' }}
                />
            )}
            {section.type === 'image' && (
                <input
                    type="text"
                    placeholder="Image URL"
                    value={section.content}
                    onChange={(e) => updateContent(index, e.target.value)}
                    style={{ width: '100%', marginTop: '8px' }}
                />
            )}
            {section.type === 'button' && (
                <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
                    {section.content}
                </Button>
            )}
        </Box>
    );
};

const Editor = () => {
    const { websiteId } = useParams();
    const [website, setWebsite] = useState(null);
    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [publishMessage, setPublishMessage] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/websites/${websiteId}`)
            .then(res => {
                // Ensure pages is an array even if undefined
                const data = res.data;
                if (!data.pages) {
                    data.pages = [];
                }
                setWebsite(data);
            })
            .catch(err => console.error(err));
    }, [websiteId]);

    const moveSection = (fromIndex, toIndex) => {
        const updatedPages = [...(website.pages || [])];
        const [movedSection] = updatedPages.splice(fromIndex, 1);
        updatedPages.splice(toIndex, 0, movedSection);
        setWebsite({ ...website, pages: updatedPages });
    };

    const updateContent = (index, newContent) => {
        const updatedPages = [...(website.pages || [])];
        updatedPages[index].content = newContent;
        setWebsite({ ...website, pages: updatedPages });
    };

    const addSection = (type) => {
        const newSection = {
            name: type.charAt(0).toUpperCase() + type.slice(1),
            type,
            content: type === 'text' ? 'New text here...' : type === 'image' ? '' : 'Click Me'
        };
        setWebsite({ ...website, pages: [...(website.pages || []), newSection] });
    };

    const saveWebsite = () => {
        setIsSaving(true);
        axios.put(`http://localhost:5000/api/websites/${websiteId}`, website)
            .then(() => {
                alert('Website saved successfully!');
                setIsSaving(false);
            })
            .catch(err => {
                console.error(err);
                setIsSaving(false);
            });
    };

    const publishWebsite = () => {
        axios.post(`http://localhost:5000/api/websites/publish/${websiteId}`)
            .then(res => setPublishMessage(`Website published at: ${res.data.url}`))
            .catch(err => console.error(err));
    };

    if (!website) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {isPreview ? "Live Preview" : `Edit: ${website.title}`}
            </Typography>
            <Box sx={{ mb: 2 }}>
                {!isPreview && (
                    <>
                        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => addSection('text')}>Add Text</Button>
                        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => addSection('image')}>Add Image</Button>
                        <Button variant="outlined" onClick={() => addSection('button')}>Add Button</Button>
                    </>
                )}
            </Box>
            <DndProvider backend={HTML5Backend}>
                {(website.pages || []).map((section, index) => (
                    <DraggableSection
                        key={index}
                        section={section}
                        index={index}
                        moveSection={moveSection}
                        updateContent={updateContent}
                    />
                ))}
            </DndProvider>
            <Box sx={{ mt: 2 }}>
                {!isPreview && (
                    <Button variant="contained" color="primary" onClick={saveWebsite} disabled={isSaving} sx={{ mr: 2 }}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                )}
                <Button variant="outlined" onClick={() => setIsPreview(!isPreview)} sx={{ mr: 2 }}>
                    {isPreview ? "Back to Edit" : "Preview"}
                </Button>
                {!isPreview && (
                    <Button variant="contained" color="secondary" onClick={publishWebsite}>
                        Publish Website
                    </Button>
                )}
            </Box>
            {publishMessage && (
                <Typography variant="body1" sx={{ mt: 2, color: 'green' }}>
                    {publishMessage}
                </Typography>
            )}
        </Container>
    );
};

export default Editor;
