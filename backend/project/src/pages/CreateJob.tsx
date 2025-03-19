import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createJob } from '../services/api';
import { useNavigate } from 'react-router-dom';

const JobSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  requirements: Yup.string().required('Required'),
  deadline: Yup.date().min(new Date(), 'Deadline must be in the future'),
});

function CreateJob() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      type: 'FULL_TIME',
      description: '',
      requirements: '',
      deadline: '',
    },
    validationSchema: JobSchema,
    onSubmit: async (values) => {
      try {
        const jobData = {
          ...values,
          requirements: values.requirements.split('\n').filter(Boolean),
          status: 'OPEN',
        };
        await createJob(jobData);
        navigate('/jobs');
      } catch (error) {
        console.error('Failed to create job:', error);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              id="title"
              type="text"
              {...formik.getFieldProps('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.title}</div>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              type="text"
              {...formik.getFieldProps('location')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.location}</div>
            )}
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              id="type"
              {...formik.getFieldProps('type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.type}</div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              id="description"
              rows={6}
              {...formik.getFieldProps('description')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.description}</div>
            )}
          </div>

          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Requirements (one per line)
            </label>
            <textarea
              id="requirements"
              rows={4}
              {...formik.getFieldProps('requirements')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Bachelor's degree in Computer Science&#10;5+ years of experience&#10;Strong communication skills"
            />
            {formik.touched.requirements && formik.errors.requirements && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.requirements}</div>
            )}
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Application Deadline
            </label>
            <input
              id="deadline"
              type="date"
              {...formik.getFieldProps('deadline')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {formik.touched.deadline && formik.errors.deadline && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.deadline}</div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post Job
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;